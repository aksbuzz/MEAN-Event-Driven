import { BasePublisher } from '../../../common/dist/publishers';
import { PostUpdatedEvent } from '../events';

export class PostUpdatedPublisher extends BasePublisher<PostUpdatedEvent> {
  subject: PostUpdatedEvent['subject'] = 'post:updated';
}
