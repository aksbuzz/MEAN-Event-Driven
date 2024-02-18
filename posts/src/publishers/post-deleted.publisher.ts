import { PostDeletedEvent } from '../events';
import { BasePublisher } from './base.publisher';

export class PostDeletedPublisher extends BasePublisher<PostDeletedEvent> {
  subject: PostDeletedEvent['subject'] = 'post:deleted';
}
