import { RouteNotFoundError, errorHandler, jwtAuth, nats } from '@aksbuzz/common';
import fastify from 'fastify';
import mongoose from 'mongoose';
import { registerRoutes } from './routes';

async function startDb() {
  try {
    console.log('Connecting to MongoDB');
    await mongoose.connect(process.env.MONGO_URL!);
    console.log('MongoDB is connected');
  } catch (error) {
    console.log('MongoDB connection unsuccessful. ', error);
    process.exit(1);
  }
}

async function startNatsServer() {
  try {
    console.log('Connecting to NATS');
    await nats.connect({ servers: process.env.NATS_URL! });
    console.log('Connected to NATS');
    // process.on('SIGINT', () => nats.nc.close());
    // process.on('SIGTERM', () => nats.nc.close());
  } catch (error) {
    console.log('NATS connection unsuccessful. ', error);
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
    await server.listen({ port: 3001, host: '0.0.0.0' });
    server.log.info(`Server listening on 3001`);
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
