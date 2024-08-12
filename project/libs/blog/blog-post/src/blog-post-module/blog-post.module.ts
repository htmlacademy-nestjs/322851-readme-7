import { Module } from "@nestjs/common";
import { BlogTagModule } from "@project/blog-tag";
import { BlogCommentModule } from '@project/blog-comment';
import { BlogPostService } from "./blog-post.service";
import { BlogPostRepository } from "./repositories/blog-post.repository";
import { BlogPostFactory } from "./blog-post.factory";
import { BlogPostController } from "./blog-post.controller";

@Module({
  imports: [BlogTagModule, BlogCommentModule],
  exports: [BlogPostService],
  providers: [BlogPostService, BlogPostRepository, BlogPostFactory],
  controllers: [BlogPostController]
})
export class BlogPostModule {

}
