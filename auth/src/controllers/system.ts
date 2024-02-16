import { RouteHandlerMethod } from 'fastify';

export const ping: RouteHandlerMethod = (request, reply) => {
  reply.status(200).send('pong');
};
