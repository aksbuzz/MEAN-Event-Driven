import { BaseSubscriber } from '../../../common/dist/subscribers';
import { PostCreatedEvent } from '../events';

export class PostCreatedSubscriber extends BaseSubscriber<PostCreatedEvent> {
  subject: PostCreatedEvent['subject'] = 'post:created';
  onMessage(data: { id: string; title: string; content: string }): void {
    console.log(data.id);
    console.log(data.title);
    console.log(data.content);
  }
}
