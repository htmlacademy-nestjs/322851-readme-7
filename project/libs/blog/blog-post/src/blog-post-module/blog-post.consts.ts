import { SortDirection, SortType } from '@project/shared-core';


export const DEFAULT_POST_COUNT_LIMIT = 25;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_SORT_TYPE = SortType.DATE;
export const DEFAULT_PAGE_COUNT = 1;

export const BlogPostValidateMessage = {
  WrongType: 'Type should be one of the next values:  video, photo, text, link, quote',
  WrongRepostStatus: 'Type of the field should be boolean',
  InvalidPostId: 'Original id should be a valid uuid',
  InvalidUserId: 'This field should be a valid MongoId',
  InvalidUrl: 'This field should be valid url',
  InvalidLinkDescription: 'Length of the description shouldn\'t exeed 300 characters',
  InvalidQuoteContent: 'This field should be string with length within 20-300 characters range',
  InvalidQuoteAuthor: 'This field should be string with length within 3-50 characters range',
  InvalidTextTitle: 'This field should be string with length within 20-50 characters range',
  InvalidTextPreview: 'This field should be string with length within 50-255 characters range',
  InvalidTextContent: 'This field should be string with length within 100-1024 characters range',
  TagCount: 'You can\'t add more than 8 tags to one post',
  TagLength: 'Tag length should be between 3-10 characters'
} as const;

export const BlogPostResponse = {
  PostsFound: 'Successfully found posts',
  PostFound: 'Post was successfully found',
  PostNotFound: 'Post wasn\'t found',
  PostCreated: 'New post successfully created',
  PostUpdated: 'Post was successfully updated',
  NotAuthorized: 'You have no rights to alter that post',
  PostDeleted: 'Post was successfully deleted',
  GetLogin: 'Login to like the post',
  LikeAdded: 'Successfully add new like',
  LikeRemoved: 'Successfully remove new like',
  NotAllowed: 'You are not allowed to change or delete this post'
}
