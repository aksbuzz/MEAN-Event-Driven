import { BasePublisher } from '../../../common/dist/publishers';
import { CommentCreatedEvent } from '../events';

export class CommentCreatedPublisher extends BasePublisher<CommentCreatedEvent> {
  subject: CommentCreatedEvent['subject'] = 'comment:created';
}
