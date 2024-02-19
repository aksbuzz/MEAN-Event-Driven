import { NotFoundError } from '../../../common/dist/errors';
import { BaseSubscriber } from '../../../common/dist/subscribers';
import { CommentDeletedEvent } from '../events';
import { Post } from '../models/post';

export class CommentDeletedSubscriber extends BaseSubscriber<CommentDeletedEvent> {
  subject: CommentDeletedEvent['subject'] = 'comment:deleted';
  async onMessage(data: CommentDeletedEvent['data']) {
    try {
      const commentId = data.id,
        postId = data.postId;

      console.log(`Comment deleted (ID: ${commentId}) on post ${postId}`);

      const post = await Post.findById(postId);
      if (!post) {
        throw new NotFoundError('Post');
      }

      // TODO
      post.updateOne({ _id: postId, $pull: { comments: commentId } });
      post.save();

      console.log(`Removed comment (ID: ${commentId}) from post ${postId}`);
    } catch (error) {
      throw new Error('Error deleting comment from post');
    }
  }
}
