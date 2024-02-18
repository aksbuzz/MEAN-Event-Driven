export interface CommentUpdatedEvent {
  subject: 'comment:updated';
  data: { id: string; postId: string; content: string };
}
