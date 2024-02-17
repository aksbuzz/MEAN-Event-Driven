import { PostCreatedEvent } from '../events';
import { BasePublisher } from './base.publisher';

export class PostCreatedPublisher extends BasePublisher<PostCreatedEvent> {
  subject: PostCreatedEvent['subject'] = 'post:created';
}
