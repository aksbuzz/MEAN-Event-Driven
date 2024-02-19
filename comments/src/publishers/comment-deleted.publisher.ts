import { BasePublisher } from '../../../common/dist/publishers';
import { CommentDeletedEvent } from '../events';

export class CommentDeletedPublisher extends BasePublisher<CommentDeletedEvent> {
  subject: CommentDeletedEvent['subject'] = 'comment:deleted';
}
