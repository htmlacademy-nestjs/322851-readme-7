import { Post } from './post.interface';

export interface TextPost {
  id?: string;
  title: string;
  preview: string;
  content: string;
  post?: Post;
}
