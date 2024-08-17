import { Post } from './post.interface';

export interface LinkPost {
  id?: string;
  url: string;
  description?: string;
  post?: Post;
}
