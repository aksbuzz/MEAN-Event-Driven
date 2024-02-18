import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { BadRequestError, NotAuthorizedError, NotFoundError } from '../../../common/dist';
import { nats } from '../lib/nats';
import { Comment, CommentDoc } from '../models/comment';
import { CommentCreatedPublisher, CommentUpdatedPublisher } from '../publishers';
import { validate } from '../util/validate';

type CommentParam = { id: string };
const schema = z.object({
  content: z.string(),
  postId: z.string(),
});
// TODO: infer type from schema
type CommentBody = { content: string; postId: string };

export async function create(request: FastifyRequest<{ Body: CommentBody }>, reply: FastifyReply) {
  const validationErrors = validate(request.body, schema);
  if (validationErrors) {
    throw new BadRequestError(validationErrors);
  }

  const comment = new Comment({ ...request.body, userId: request.user });
  await comment.save();

  new CommentCreatedPublisher(nats.nc).publish({ id: comment.id, postId: request.body.postId });

  reply.status(201).send(comment);
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

  new CommentUpdatedPublisher(nats.nc).publish({
    id: comment.id,
    postId: request.body.postId,
    content: request.body.content,
  });

  reply.status(200).send(comment);
}
