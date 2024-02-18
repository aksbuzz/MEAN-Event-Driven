export interface PostUpdatedEvent {
  subject: 'post:updated';
  data: {
    id: string;
    title: string;
    content: string;
    userId: string;
  };
}
