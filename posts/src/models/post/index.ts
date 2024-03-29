import mongoose from 'mongoose';

interface PostDoc extends mongoose.Document {
  title: string;
  content: string;
  userId: string;
  comments: Array<string>;
}

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: String, required: true },
    comments: [{ type: String, required: false }],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

export const Post = mongoose.model<PostDoc>('Post', PostSchema);
