import { Post } from './post.interface';

export interface PhotoPost {
  id?: string;
  path: string;
  description: string;
  post?: Post;
  postId?: string;

}
