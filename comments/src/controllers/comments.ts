import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  composeResponse,
  nats,
  validate,
} from '@aksbuzz/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { Comment } from '../models/comment';
import { CommentCreatedPublisher } from '../publishers';

const schema = z.object({
  content: z.string(),
  postId: z.string(),
});
type CommentParam = { id: string };
type CommentBody = z.TypeOf<typeof schema>;

export async function create(request: FastifyRequest<{ Body: CommentBody }>, reply: FastifyReply) {
  const validationErrors = validate(request.body, schema);
  if (validationErrors) {
    throw new BadRequestError(validationErrors);
  }

  const comment = new Comment({ ...request.body, userId: request.user });
  await comment.save();

  new CommentCreatedPublisher(nats.nc).publish({ id: comment.id, postId: request.body.postId });

  reply.status(201).send(composeResponse(comment));
}

export async function update(
  request: FastifyRequest<{ Body: CommentBody; Params: CommentParam }>,
  reply: FastifyReply
) {
  const validationErrors = validate(request.body, schema);
  if (validationErrors) {
    throw new BadRequestError(validationErrors);
  }

  const comment = await Comment.findById(request.params.id);
  if (!comment) {
    throw new NotFoundError('Comment');
  }

  if (comment.userId !== request.user) {
    throw new NotAuthorizedError('Not authorized to update comment');
  }

  comment.set({ ...request.body });
  await comment.save();

  reply.status(200).send(composeResponse(comment));
}
