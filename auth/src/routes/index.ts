import { FastifyInstance } from 'fastify';
import * as authentication from '../controllers/authentication';
import * as system from '../controllers/system';
import * as user from '../controllers/user';

export function registerRoutes(server: FastifyInstance) {
  registerAuthRoutes(server);
  registerUserRoutes(server);
  registerSystemRoutes(server);
}

function registerAuthRoutes(server: FastifyInstance) {
  server.post('/auth/signin', authentication.signin);
  server.post('/auth/signup', authentication.signup);
}

function registerUserRoutes(server: FastifyInstance) {
  server.get('/current', user.current);
}

function registerSystemRoutes(server: FastifyInstance) {
  server.get('/ping', system.ping);
}
