export interface CommentDeletedEvent {
  subject: 'comment:deleted';
  data: { id: string; postId: string };
}
