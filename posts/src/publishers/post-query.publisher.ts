import { BasePublisher } from '../../../common/dist/publishers';
import { PostQueryEvent } from '../events/post-query.event';

export class PostQueryPublisher extends BasePublisher<PostQueryEvent> {
  subject: PostQueryEvent['subject'] = 'post:query';
}
