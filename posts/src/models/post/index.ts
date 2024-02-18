import mongoose from 'mongoose';
import { CommentDoc } from '../comment';

interface PostDoc extends mongoose.Document {
  title: string;
  content: string;
  userId: string;
  comments: [CommentDoc];
}

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: String, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: false }],
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
