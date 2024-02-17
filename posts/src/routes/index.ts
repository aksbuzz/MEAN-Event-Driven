import { FastifyInstance } from 'fastify';
import * as posts from '../controllers/posts';
import * as system from '../controllers/system';

export function registerRoutes(server: FastifyInstance) {
  registerPostRoutes(server);
  registerSystemRoutes(server);
}

function registerPostRoutes(server: FastifyInstance) {
  server.get('/', posts.getPosts);
  server.get('/:id', posts.getPost);
  server.post('/', posts.create);
  server.put('/:id', posts.update);
}

function registerSystemRoutes(server: FastifyInstance) {
  server.get('/ping', system.ping);
}
