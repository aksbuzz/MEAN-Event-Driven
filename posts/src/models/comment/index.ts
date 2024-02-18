import mongoose from 'mongoose';

export interface CommentDoc extends mongoose.Document {
  content: string;
  userId: string;
  postId: string;
  // createdAt: Date;
}

const CommentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    userId: { type: String, required: true },
    postId: { type: String, required: true },
    // createdAt: { type: Date, required: true, default: Date.now() },
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

export const Comment = mongoose.model<CommentDoc>('Comment', CommentSchema);
