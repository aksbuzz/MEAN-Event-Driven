import mongoose from 'mongoose';
import { nats } from '../../common/dist/infrastructure';
import { PostCreatedSubscriber, UserCreatedSubscriber } from './subscribers';

async function startDb() {
  try {
    console.log('Connecting to MongoDB');
    await mongoose.connect('mongodb://localhost:27017/marketing');
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
