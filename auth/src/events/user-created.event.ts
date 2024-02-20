export interface UserCreatedEvent {
  subject: 'user:created';
  data: { email: string; userId: string };
}
