import { CommentDeletedEvent } from '../events';
import { BasePublisher } from './base.publisher';

export class CommentDeletedPublisher extends BasePublisher<CommentDeletedEvent> {
  subject: CommentDeletedEvent['subject'] = 'comment:deleted';
}
