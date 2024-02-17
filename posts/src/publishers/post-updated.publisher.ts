import { PostUpdatedEvent } from '../events';
import { BasePublisher } from './base.publisher';

export class PostUpdatedPublisher extends BasePublisher<PostUpdatedEvent> {
  subject: PostUpdatedEvent['subject'] = 'post:updated';
}
