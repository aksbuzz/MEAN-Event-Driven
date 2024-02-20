import { BasePublisher } from '@aksbuzz/common';
import { PostQueryEvent } from '../events/post-query.event';

export class PostQueryPublisher extends BasePublisher<PostQueryEvent> {
  subject: PostQueryEvent['subject'] = 'post:query';
}
