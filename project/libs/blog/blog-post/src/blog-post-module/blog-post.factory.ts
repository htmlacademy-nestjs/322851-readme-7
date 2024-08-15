import { EntityFactory, Post, Tag } from '@project/shared-core';
import { BlogPostEntity } from './blog-post.entity';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class BlogPostFactory implements EntityFactory<BlogPostEntity> {
  public create(entityPlainData: Post): BlogPostEntity {
    return new BlogPostEntity(entityPlainData);
  }

  public static createNewPost(dto: CreatePostDto, tags: Tag[]): BlogPostEntity {
    const newPost = new BlogPostEntity();
    newPost.commentsCount = 0;
    newPost.isPublished = true;
    newPost.isRepost = dto.isRepost;
    newPost.originalAuthor = dto.originalAuthor;
    newPost.originalId = dto.originalId;
    newPost.likesCount = 0;
    newPost.tags = tags;
    newPost.type = dto.type;
    newPost.userId = dto.userId;
    newPost.video = dto.video ?? undefined;
    newPost.photo = dto.photo ?? undefined;
    newPost.link = dto.link ?? undefined;
    newPost.quote = dto.quote ?? undefined;
    newPost.text = dto.text ?? undefined;

    return newPost;
  }

}
