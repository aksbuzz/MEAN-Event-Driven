import { PostUpdatedEvent } from '../events';
import { BaseSubscriber } from './base.subscriber';

export class PostUpdatedSubscriber extends BaseSubscriber<PostUpdatedEvent> {
  subject: PostUpdatedEvent['subject'] = 'post:updated';
  onMessage(data: PostUpdatedEvent['data']): void {
    console.log(
      `Post updated with id: "${data.id}".\nTitle: ${data.title}\nContent: ${data.content}`
    );
  }
}
