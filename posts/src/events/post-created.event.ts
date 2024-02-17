export interface PostCreatedEvent {
  subject: 'post:created';
  data: {
    id: string;
    title: string;
    content: string;
  };
}
