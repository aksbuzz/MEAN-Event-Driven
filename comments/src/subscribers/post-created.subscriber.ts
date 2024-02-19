import { BaseSubscriber } from '../../../common/dist/subscribers';
import { PostCreatedEvent } from '../events';

export class PostCreatedSubscriber extends BaseSubscriber<PostCreatedEvent> {
  subject: PostCreatedEvent['subject'] = 'post:created';
  onMessage(data: PostCreatedEvent['data']): void {
    console.log(
      `Post created with id: "${data.id}".\nTitle: ${data.title}\nContent: ${data.content}`
    );
  }
}
