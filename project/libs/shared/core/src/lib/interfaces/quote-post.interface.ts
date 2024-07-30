import { Post } from './post.interface';

export interface QuotePost {
  id?: string;
  content: string;
  author: string;
  post?: Post;
  postId?: string;
}
