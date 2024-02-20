import { FastifyReply, FastifyRequest } from 'fastify';
import { NotAuthorizedError } from '../errors';
import { verifyToken } from '../util/jwt-token';

export async function jwtAuth(request: FastifyRequest, reply: FastifyReply) {
  const { url, method } = request;
  // skip for ping route
  if (
    (url.startsWith('/api/users/ping') ||
      url.startsWith('/api/posts/ping') ||
      url.startsWith('/api/comments/ping') ||
      url.startsWith('/api/marketing/ping')) &&
    method === 'GET'
  )
    return;
  // skip for auth routes
  if (url.startsWith('/api/users/auth')) return;

  const token = getTokenFromRequest(request);
  if (!token) {
    throw new NotAuthorizedError('Authentication token is missing.');
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    throw new NotAuthorizedError('Authentication token is invalid.');
  }

  const userId = decoded.sub;
  request.user = userId;
}

function getTokenFromRequest(request: FastifyRequest) {
  const authHeader = request.headers.authorization || '';
  const [type, token] = authHeader.split(' ');
  return type === 'Bearer' && token ? token : '';
}
