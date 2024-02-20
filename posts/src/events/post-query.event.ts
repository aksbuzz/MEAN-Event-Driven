export interface PostQueryEvent {
  subject: 'post:query';
  data: { id: string };
}
