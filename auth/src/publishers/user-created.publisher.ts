import { BasePublisher } from '@aksbuzz/common';
import { UserCreatedEvent } from '../events';

export class UserCreatedPublisher extends BasePublisher<UserCreatedEvent> {
  subject: UserCreatedEvent['subject'] = 'user:created';
}
