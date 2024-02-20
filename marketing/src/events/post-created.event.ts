export interface PostCreatedEvent {
  subject: 'post:created';
  data: { userId: string };
}
