export interface PostDeletedEvent {
  subject: 'post:deleted';
  data: {
    id: string;
    title: string;
    content: string;
    comments?: Array<any>;
  };
}
