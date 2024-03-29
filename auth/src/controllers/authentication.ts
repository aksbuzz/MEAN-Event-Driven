import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  composeResponse,
  generateToken,
  nats,
  validate,
} from '@aksbuzz/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { User, UserRequest } from '../models/user';
import { UserCreatedPublisher } from '../publishers';
import { comparePassword, toHash } from '../util/password-hash';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(20),
});

export const signin = async (
  request: FastifyRequest<{ Body: UserRequest }>,
  reply: FastifyReply
) => {
  const { email, password } = request.body;

  const validationErrors = validate(request.body, schema);
  if (validationErrors) {
    throw new BadRequestError(validationErrors);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError('User with email');
  }

  const passwordMatch = await comparePassword(user.password, password);
  if (!passwordMatch) {
    throw new BadRequestError({ password: 'Incorrect login password' });
  }

  const token = generateToken(user.id);
  reply.status(200).send(composeResponse({ token }));
};

export const signup = async (
  request: FastifyRequest<{ Body: UserRequest }>,
  reply: FastifyReply
) => {
  const { email, password } = request.body;

  const validationErrors = validate(request.body, schema);
  if (validationErrors) {
    throw new BadRequestError(validationErrors);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ConflictError(email);
  }

  const hashedPassword = await toHash(password);
  const user = new User({ email, password: hashedPassword });
  await user.save();

  new UserCreatedPublisher(nats.nc).publish({ email, userId: user.id });

  const token = generateToken(user.id);
  reply.status(201).send(composeResponse({ token }));
};
