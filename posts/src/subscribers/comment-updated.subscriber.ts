import { CommentUpdatedEvent } from '../events';
import { BaseSubscriber } from './base.subscriber';

export class CommentUpdatedSubscriber extends BaseSubscriber<CommentUpdatedEvent> {
  subject: CommentUpdatedEvent['subject'] = 'comment:updated';
  onMessage(data: CommentUpdatedEvent['data']): void {
    const commentId = data.id,
      postId = data.postId,
      content = data.content;
    console.log(`Comment updated (ID: ${commentId}) on post ${postId}. Content: (${content})`);
  }
}
