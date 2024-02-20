import { BasePublisher } from '../../../common/dist/publishers';
import { UserCreatedEvent } from '../events';

export class UserCreatedPublisher extends BasePublisher<UserCreatedEvent> {
  subject: UserCreatedEvent['subject'] = 'user:created';
}
