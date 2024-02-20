import { BasePublisher } from '@aksbuzz/common';
import { CommentCreatedEvent } from '../events';

export class CommentCreatedPublisher extends BasePublisher<CommentCreatedEvent> {
  subject: CommentCreatedEvent['subject'] = 'comment:created';
}
