import { nats } from '@aksbuzz/common';
import mongoose from 'mongoose';
import { PostCreatedSubscriber, UserCreatedSubscriber } from './subscribers';

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
  } catch (error) {
    console.log('NATS connection unsuccessful. ', error);
    process.exit(1);
  }
}

async function main() {
  await startDb();
  await startNatsServer();

  new UserCreatedSubscriber(nats.nc).subscribe();
  new PostCreatedSubscriber(nats.nc).subscribe();
}

main();
