import { BasePublisher } from '../../../common/dist/publishers';
import { PostDeletedEvent } from '../events';

export class PostDeletedPublisher extends BasePublisher<PostDeletedEvent> {
  subject: PostDeletedEvent['subject'] = 'post:deleted';
}
