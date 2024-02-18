export interface CommentCreatedEvent {
  subject: 'comment:created';
  data: { id: string; postId: string };
}
