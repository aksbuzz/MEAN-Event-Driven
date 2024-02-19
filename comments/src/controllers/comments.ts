import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { BadRequestError, NotAuthorizedError, NotFoundError } from '../../../common/dist/errors';
import { nats } from '../../../common/dist/infrastructure';
import { validate } from '../../../common/dist/util';
import { Comment } from '../models/comment';
import { CommentCreatedPublisher, CommentUpdatedPublisher } from '../publishers';

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
