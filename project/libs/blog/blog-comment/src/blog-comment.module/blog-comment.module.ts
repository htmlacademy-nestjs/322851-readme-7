import { Module } from '@nestjs/common'
import { BlogCommentRepository } from './blog-comment.repository';
import { BlogCommentFactory } from './blog-comment.factory';
import { BlogCommentService } from './blog-comment.service';
import { BlogCommentController } from './blog-comment.controller';
import { BlogPostModule } from '@project/blog-post'


@Module({
  imports: [BlogPostModule],
  exports: [BlogCommentService],
  providers: [BlogCommentRepository, BlogCommentFactory, BlogCommentService],
  controllers: [BlogCommentController]
})
export class BlogCommentModule {}
