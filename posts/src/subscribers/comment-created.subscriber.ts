import { NotFoundError } from '../../../common/dist/errors';
import { BaseSubscriber } from '../../../common/dist/subscribers';
import { CommentCreatedEvent } from '../events';
import { Post } from '../models/post';

export class CommentCreatedSubscriber extends BaseSubscriber<CommentCreatedEvent> {
  subject: CommentCreatedEvent['subject'] = 'comment:created';
  async onMessage(data: CommentCreatedEvent['data']) {
    try {
      const commentId = data.id,
        postId = data.postId;

      console.log(`New comment created (ID: ${commentId}) on post ${postId}`);

      const post = await Post.findById(postId);
      if (!post) {
        throw new NotFoundError('Post');
      }
      await post.updateOne({ $push: { comments: commentId } });

      console.log(`Added comment (ID: ${commentId}) to post ${postId}`);
    } catch (error) {
      throw new Error('Error adding comment to post');
    }
  }
}
