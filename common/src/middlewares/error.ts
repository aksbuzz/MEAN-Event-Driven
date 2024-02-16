import { FastifyReply, FastifyRequest } from 'fastify';
import { CustomError } from '../errors';

export function errorHandler(error: Error, request: FastifyRequest, reply: FastifyReply) {
  console.error(error);

  const err =
    error instanceof CustomError
      ? { ...error }
      : {
          code: 'INTERNAL_ERROR',
          message: 'Internal Server Error. Please try again.',
          status: 500,
          data: {},
        };

  reply.status(err.status).send({ error: err });
}
