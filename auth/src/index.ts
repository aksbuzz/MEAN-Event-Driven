import fastify from 'fastify';
import { errorHandler, jwtAuth, RouteNotFoundError } from '../../common/dist';
import { newDbConnection } from './db';
import { registerRoutes } from './routes';

async function startDb() {
  try {
    console.log('Connecting to MongoDB');
    await newDbConnection();
    console.log('MongoDB is connected');
  } catch (error) {
    console.log('MongoDB connection unsuccessful. ', error);
    process.exit(1);
  }
}

async function startServer() {
  const server = fastify({ logger: true });

  server.addHook('onRequest', jwtAuth);

  server.register(
    function (app, {}, done) {
      registerRoutes(app);
      done();
    },
    { prefix: '/api/users' }
  );
  server.all('*', async request => {
    throw new RouteNotFoundError(request.url);
  });

  server.setErrorHandler(errorHandler);

  try {
    await server.listen({ port: 3001 });
    server.log.info(`Server listening on 3001`);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
}

async function main() {
  await startDb();
  await startServer();
}

main();