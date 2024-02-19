import fastify from 'fastify';
import mongoose from 'mongoose';
import { RouteNotFoundError } from '../../common/dist/errors';
import { nats } from '../../common/dist/infrastructure';
import { errorHandler, jwtAuth } from '../../common/dist/middlewares';
import { registerRoutes } from './routes';
import { CommentCreatedSubscriber } from './subscribers';

async function startDb() {
  try {
    console.log('Connecting to MongoDB');
    await mongoose.connect('mongodb://localhost:27017/post');
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

  new CommentCreatedSubscriber(nats.nc).subscribe();
}

main();
