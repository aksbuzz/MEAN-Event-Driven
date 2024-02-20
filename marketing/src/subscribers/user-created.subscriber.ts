import { BaseSubscriber } from '../../../common/dist/subscribers';
import { UserCreatedEvent } from '../events';
import { Marketing } from '../models/marketing';

export class UserCreatedSubscriber extends BaseSubscriber<UserCreatedEvent> {
  subject: UserCreatedEvent['subject'] = 'user:created';
  async onMessage(data: UserCreatedEvent['data']) {
    try {
      const email = data.email,
        userId = data.userId;

      const user = new Marketing({ email, userId, sendEmail: true });
      await user.save();
    } catch (error) {
      console.log('Error in user created subscriber: ', error);
      throw error;
    }
  }
}
