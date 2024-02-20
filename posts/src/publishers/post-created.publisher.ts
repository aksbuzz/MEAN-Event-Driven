import { BasePublisher } from '@aksbuzz/common';
import { PostCreatedEvent } from '../events';

export class PostCreatedPublisher extends BasePublisher<PostCreatedEvent> {
  subject: PostCreatedEvent['subject'] = 'post:created';
}
