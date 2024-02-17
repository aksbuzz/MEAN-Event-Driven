import { PostCreatedEvent } from '../events';
import { BaseSubscriber } from './base.subscriber';

export class PostCreatedSubscriber extends BaseSubscriber<PostCreatedEvent> {
  subject: PostCreatedEvent['subject'] = 'post:created';
  onMessage(data: { id: string; title: string; content: string }): void {
    console.log(data.id);
    console.log(data.title);
    console.log(data.content);
  }
}
