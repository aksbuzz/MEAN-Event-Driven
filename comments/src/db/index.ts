import mongoose from 'mongoose';

export async function newDbConnection() {
  const options = {};
  try {
    await mongoose.connect('mongodb://localhost:27017/comments', options);
  } catch (error) {
    throw error;
  }
}
