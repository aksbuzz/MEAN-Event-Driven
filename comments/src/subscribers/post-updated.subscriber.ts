import { BaseSubscriber } from '../../../common/dist/subscribers';
import { PostUpdatedEvent } from '../events';

export class PostUpdatedSubscriber extends BaseSubscriber<PostUpdatedEvent> {
  subject: PostUpdatedEvent['subject'] = 'post:updated';
  onMessage(data: PostUpdatedEvent['data']): void {
    console.log(
      `Post updated with id: "${data.id}".\nTitle: ${data.title}\nContent: ${data.content}`
    );
  }
}
