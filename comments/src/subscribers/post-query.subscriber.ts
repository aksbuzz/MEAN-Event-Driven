import { BaseSubscriber } from '../../../common/dist/subscribers';
import { PostQueryEvent } from '../events/post-query.event';
import { Comment } from '../models/comment';

export class PostQuerySubscriber extends BaseSubscriber<PostQueryEvent> {
  subject: PostQueryEvent['subject'] = 'post:query';
  async onMessage(data: PostQueryEvent['data'], respond: (value: any) => void) {
    const postId = data.id;
    const comments = await Comment.find({ postId });
    respond(comments);
  }
}
