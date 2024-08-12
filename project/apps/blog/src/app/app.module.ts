import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogTagModule } from '@project/blog-tag';
import { BlogCommentModule } from '@project/blog-comment';
import { BlogPostModule } from '@project/blog-post'

@Module({
  imports: [BlogTagModule, BlogCommentModule, BlogPostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
