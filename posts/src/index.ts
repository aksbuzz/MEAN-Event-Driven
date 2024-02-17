import fastify from 'fastify';
import { errorHandler, jwtAuth, RouteNotFoundError } from '../../common/dist';
import { newDbConnection } from './db';
import { nats } from './lib/nats';
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

async function startNatsServer() {
  try {
    console.log('Connecting to NATS');
    await nats.connect();
    console.log('Connected to NATS');
    // process.on('SIGINT', () => nats.nc.close());
    // process.on('SIGTERM', () => nats.nc.close());
  } catch (error) {
    console.log('NATS connection unsuccessful. ', error);
    process.exit(1);
  }
}

async function startServer() {
  const server = fastify({ logger: true, trustProxy: true });

  server.addHook('onRequest', jwtAuth);

  server.register(
    function (app, {}, done) {
      registerRoutes(app);
      done();
    },
    { prefix: '/api/posts' }
  );
  server.all('*', async request => {
    throw new RouteNotFoundError(request.url);
  });

  server.setErrorHandler(errorHandler);

  try {
    await server.listen({ port: 3002 });
    server.log.info(`Server listening on 3002`);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
}

async function main() {
  await startDb();
  await startNatsServer();
  await startServer();
}

main();
