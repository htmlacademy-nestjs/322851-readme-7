import { Expose } from 'class-transformer'

export class BlogCommentRdo {
  @Expose()
  text: string;

  @Expose()
  userId: string;

  @Expose()
  createdAt: Date;

  @Expose()
  postId: string;
}
