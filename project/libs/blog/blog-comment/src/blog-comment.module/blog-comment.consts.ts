import { SortDirection } from '@project/shared-core';

export const DEFAULT_COMMENT_COUNT_LIMIT = 50;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_PAGE_COUNT = 1;

export const BlogCommentValidateMessage = {
  TextNotValid: 'Comment message should be string with length from 10 to 300 characters',
  InvalidId: 'User id should be valid MongoId'
} as const;

export const BlogCommentRespose = {
  CommentsFound: 'Successfully found comments of the post',
  CommentCreated: 'Successfully create comment',
  CommentDeleted: 'Successfully delete comment',
  PostNotFound: 'Post not found',
  CommentNotFound: 'Comment not found',
  NotAllowed: 'You are not allowed to deletec this comment'
} as const;
