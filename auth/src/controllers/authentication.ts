import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { BadRequestError, NotFoundError, generateToken } from '../../../common/dist';
import { User, UserRequest } from '../models/user';
import { comparePassword, toHash } from '../util/password-hash';
import { validate } from '../util/validate';

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
  reply.status(200).send({ token });
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
    throw new BadRequestError({ email: 'User with this email already exists' });
  }

  const hashedPassword = await toHash(password);
  const user = new User({ email, password: hashedPassword });
  await user.save();

  const token = generateToken(user.id);
  reply.status(201).send({ token });
};
