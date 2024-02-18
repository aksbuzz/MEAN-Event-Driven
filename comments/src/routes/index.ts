import { FastifyInstance } from 'fastify';
import * as comments from '../controllers/comments';
import * as system from '../controllers/system';

export function registerRoutes(server: FastifyInstance) {
  registerCommentRoutes(server);
  registerSystemRoutes(server);
}

function registerCommentRoutes(server: FastifyInstance) {
  server.post('/', comments.create);
  server.put('/:id', comments.update);
}

function registerSystemRoutes(server: FastifyInstance) {
  server.get('/ping', system.ping);
}
