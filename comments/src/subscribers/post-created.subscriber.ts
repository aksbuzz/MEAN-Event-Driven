import { PostCreatedEvent } from '../events';
import { BaseSubscriber } from './base.subscriber';

export class PostCreatedSubscriber extends BaseSubscriber<PostCreatedEvent> {
  subject: PostCreatedEvent['subject'] = 'post:created';
  onMessage(data: PostCreatedEvent['data']): void {
    console.log(
      `Post created with id: "${data.id}".\nTitle: ${data.title}\nContent: ${data.content}`
    );
  }
}
