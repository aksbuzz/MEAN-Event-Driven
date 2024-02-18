import { CommentCreatedEvent } from '../events';
import { BasePublisher } from './base.publisher';

export class CommentCreatedPublisher extends BasePublisher<CommentCreatedEvent> {
  subject: CommentCreatedEvent['subject'] = 'comment:created';
}
