import { PostType } from '../types/post-type.enum';
import { Comment } from './comment.interface';
import { Like } from './like.interface';
import { LinkPost } from './link-post.interface';
import { PhotoPost } from './photo-post.interface';
import { QuotePost } from './quote-post.interface';
import { Tag } from './tag.interface';
import { TextPost } from './text-post.interface';
import { VideoPost } from './video-post.inteface';

export interface Post {
  id: string;
  type: PostType;
  userId :string;
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
  isRepost: boolean;
  originalId?: string;
  originalAuthor?: string;
  likesCount: number;
  commentsCount: number;
  tags: Tag[];
  comments: Comment[];
  likes: Like[];
  video?: VideoPost;
  photo?: PhotoPost;
  quote?: QuotePost;
  text?: TextPost;
  link?: LinkPost;
}
