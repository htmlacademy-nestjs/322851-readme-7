import { Module } from "@nestjs/common";
import { BlogLikeService } from "./blog-like.service";
import { BlogLikeFactory } from "./blog-like.factory";
import { BlogLikeRepository } from "./blog-like.repository";

@Module({
  providers: [BlogLikeService, BlogLikeFactory, BlogLikeRepository],
  exports: [BlogLikeService]
})
export class BlogLikeModule {}
