import { BasePublisher } from '../../../common/dist/publishers';
import { CommentUpdatedEvent } from '../events';

export class CommentUpdatedPublisher extends BasePublisher<CommentUpdatedEvent> {
  subject: CommentUpdatedEvent['subject'] = 'comment:updated';
}
