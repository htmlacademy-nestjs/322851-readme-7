export const BlogCommentValidateMessage = {
  TextNotValid: 'Comment message should be string with length from 10 to 300 characters',
  InvalidId: 'User id should be valid MongoId'
} as const;

export const MAX_COMMENTS_COUNT = 50;
