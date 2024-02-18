import { CommentUpdatedEvent } from '../events';
import { BasePublisher } from './base.publisher';

export class CommentUpdatedPublisher extends BasePublisher<CommentUpdatedEvent> {
  subject: CommentUpdatedEvent['subject'] = 'comment:updated';
}
