import { BaseSubscriber, NotFoundError } from '@aksbuzz/common';
import { PostCreatedEvent } from '../events';
import { Marketing } from '../models/marketing';

export class PostCreatedSubscriber extends BaseSubscriber<PostCreatedEvent> {
  subject: PostCreatedEvent['subject'] = 'post:created';

  async onMessage(data: PostCreatedEvent['data']) {
    try {
      const user = await Marketing.findOne({ userId: data.userId });
      if (!user) {
        throw new NotFoundError('User');
      }

      const { email, sendEmail } = user;
      if (sendEmail) {
        console.log(`Sending email to user (${email})`);
        await user.updateOne({ sendEmail: false });
        console.log(`Sent email to user (${email})`);
      }
    } catch (error) {
      console.log('Error in post created subscriber: ', error);
      throw error;
    }
  }
}
