import { BasePublisher } from '../../../common/dist/publishers';
import { PostCreatedEvent } from '../events';

export class PostCreatedPublisher extends BasePublisher<PostCreatedEvent> {
  subject: PostCreatedEvent['subject'] = 'post:created';
}
