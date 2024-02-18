import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { BadRequestError, NotAuthorizedError, NotFoundError } from '../../../common/dist';
import { nats } from '../lib/nats';
import { Post } from '../models/post';
import { PostCreatedPublisher, PostUpdatedPublisher } from '../publishers';
import { validate } from '../util/validate';

type PostBody = { title: string; content: string; comments?: [] };
type PostParam = { id: string };
// TODO: add validation for comments array
const schema = z.object({ title: z.string(), content: z.string() });

export async function getPosts(_request: FastifyRequest, reply: FastifyReply) {
  const posts = await Post.find({});
  reply.status(200).send(posts);
}

export async function getPost(request: FastifyRequest<{ Params: PostParam }>, reply: FastifyReply) {
  const { id } = request.params;
  const post = await Post.findById(id);
  if (!post) {
    throw new NotFoundError('Post');
  }

  reply.status(200).send(post);
}

export async function create(request: FastifyRequest<{ Body: PostBody }>, reply: FastifyReply) {
  const { title, content, comments = [] } = request.body;

  const validationErrors = validate(request.body, schema);
  if (validationErrors) {
    throw new BadRequestError(validationErrors);
  }

  const post = new Post({ userId: request.user, title, content, comments });
  await post.save();

  new PostCreatedPublisher(nats.nc).publish({ id: post.id, title, content, comments });

  reply.status(201).send(post);
}

export async function update(
  request: FastifyRequest<{ Body: PostBody; Params: PostParam }>,
  reply: FastifyReply
) {
  const { title, content, comments } = request.body;
  const { id } = request.params;

  const validationErrors = validate(request.body, schema);
  if (validationErrors) {
    throw new BadRequestError(validationErrors);
  }

  const post = await Post.findById(id);
  if (!post) {
    throw new NotFoundError('Post');
  }

  if (post.userId !== request.user) {
    throw new NotAuthorizedError('Not authorized to update post');
  }

  post.set({ title, content, comments });
  await post.save();

  new PostUpdatedPublisher(nats.nc).publish({ id: post.id, title, content, userId: post.userId });

  reply.status(200).send(post);
}

// export async function remove(request: FastifyRequest<{ Params: PostParam }>, reply: FastifyReply) {
//   const post = await Post.findById(request.params.id);
//   if (!post) {
//     throw new NotFoundError('Post');
//   }

//   if (post.userId !== request.user) {
//     throw new NotAuthorizedError('Not authorized to delete post');
//   }

//   post.deleteOne();
//   await post.save();

//   new PostDeletedPublisher(nats.nc).publish({ id: post.id, title, content, comments });

//   reply.status(200).send(post);
// }
