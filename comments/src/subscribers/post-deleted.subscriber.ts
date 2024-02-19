import { BaseSubscriber } from '../../../common/dist/subscribers';
import { PostDeletedEvent } from '../events';
import { Comment } from '../models/comment';

export class PostDeletedSubscriber extends BaseSubscriber<PostDeletedEvent> {
  subject: PostDeletedEvent['subject'] = 'post:deleted';
  async onMessage(data: PostDeletedEvent['data']) {
    const { id, comments } = data;

    console.log(`Post deleted (ID: ${id})"`);

    if (!comments) {
      return;
    }

    await Comment.deleteMany({ _id: { $in: comments } });
    console.log(`Comments deleted for post (ID: ${id})"`);
  }
}
