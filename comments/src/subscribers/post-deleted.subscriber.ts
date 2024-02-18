import { PostDeletedEvent } from '../events';
import { BaseSubscriber } from './base.subscriber';

export class PostDeletedSubscriber extends BaseSubscriber<PostDeletedEvent> {
  subject: PostDeletedEvent['subject'] = 'post:deleted';
  onMessage(data: PostDeletedEvent['data']): void {
    console.log(`Post deleted with id: "${data.id}"`);
  }
}
