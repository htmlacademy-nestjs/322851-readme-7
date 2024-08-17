export interface Comment {
  id?: string;
  text: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  postId?: string;
}
