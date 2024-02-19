import mongoose from 'mongoose';

export async function newDbConnection({ uri }: { uri: string }) {
  const options = {};
  try {
    await mongoose.connect(uri, options);
  } catch (error) {
    throw error;
  }
}
