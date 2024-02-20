import { NotAuthorizedError } from '@aksbuzz/common';
import { RouteHandlerMethod } from 'fastify';
import { User } from '../models/user';

export const current: RouteHandlerMethod = async (request, reply) => {
  const userId = request.user;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new NotAuthorizedError('Authentication token is invalid. User not found.');
  }

  reply.status(200).send({ user });
};
