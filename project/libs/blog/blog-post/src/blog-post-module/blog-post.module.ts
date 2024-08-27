import { Module } from "@nestjs/common";
import { BlogTagModule } from "@project/blog-tag";
import { BlogPostService } from "./blog-post.service";
import { BlogPostRepository } from "./repositories/blog-post.repository";
import { BlogPostFactory } from "./blog-post.factory";
import { BlogPostController } from "./blog-post.controller";
import { BlogLikeModule } from '@project/blog-like';
import { BlogNotifyModule } from '@project/blog-notify';

@Module({
  imports: [BlogTagModule, BlogLikeModule, BlogNotifyModule],
  exports: [BlogPostService],
  providers: [BlogPostService, BlogPostRepository, BlogPostFactory],
  controllers: [BlogPostController]
})
export class BlogPostModule {

}
