import { Module } from '@nestjs/common';

import { BlogTagModule } from '@project/blog-tag';
import { BlogCommentModule } from '@project/blog-comment';
import { BlogPostModule } from '@project/blog-post'
import { BlogLikeModule } from '@project/blog-like';

@Module({
  imports: [BlogTagModule, BlogCommentModule, BlogPostModule, BlogLikeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
