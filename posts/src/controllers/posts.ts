import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  nats,
  validate,
} from '@aksbuzz/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { Post } from '../models/post';
import { PostCreatedPublisher, PostQueryPublisher } from '../publishers';

const schema = z.object({
  title: z.string(),
  content: z.string(),
  comments: z.array(z.any()).optional(),
});
type PostParam = { id: string };
type PostBody = z.TypeOf<typeof schema>;

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

  const comments = await new PostQueryPublisher(nats.nc).request({ id }, { timeout: 1000 });
  const response = { ...post.toJSON(), comments };

  reply.status(200).send(response);
}

export async function create(request: FastifyRequest<{ Body: PostBody }>, reply: FastifyReply) {
  const { title, content, comments = [] } = request.body;

  const validationErrors = validate(request.body, schema);
  if (validationErrors) {
    throw new BadRequestError(validationErrors);
  }

  const post = new Post({ userId: request.user, title, content, comments });
  await post.save();

  new PostCreatedPublisher(nats.nc).publish({ userId: post.userId });

  reply.status(201).send(post);
}

export async function update(
  request: FastifyRequest<{ Body: PostBody; Params: PostParam }>,
  reply: FastifyReply
) {
  const { title, content } = request.body;
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

  post.set({ title, content });
  await post.save();

  reply.status(200).send(post);
}
