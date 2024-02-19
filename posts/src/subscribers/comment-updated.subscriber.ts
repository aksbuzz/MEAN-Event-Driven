import { BaseSubscriber } from '../../../common/dist/subscribers';
import { CommentUpdatedEvent } from '../events';

export class CommentUpdatedSubscriber extends BaseSubscriber<CommentUpdatedEvent> {
  subject: CommentUpdatedEvent['subject'] = 'comment:updated';
  onMessage(data: CommentUpdatedEvent['data']): void {
    const commentId = data.id,
      postId = data.postId,
      content = data.content;
    console.log(`Comment updated (ID: ${commentId}) on post ${postId}. Content: (${content})`);
  }
}
