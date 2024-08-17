import { LinkPost, PhotoPost, QuotePost, TextPost, VideoPost } from '../../index';
import { Tag } from './tag.interface';
import { PostType } from '@prisma/client';

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
  video?: VideoPost;
  photo?: PhotoPost;
  link?: LinkPost;
  quote?: QuotePost;
  text?: TextPost;
  videoId?: string;
  photoId?: string;
  linkId?: string;
  quoteId?: string;
  textId?: string;
  _count?: {
    comments: number;
    likes: number;
  }
}
