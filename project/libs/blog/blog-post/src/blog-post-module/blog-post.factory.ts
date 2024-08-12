import { EntityFactory, Post, Tag } from '@project/shared-core';
import { BlogPostEntity } from './blog-post.entity';
import { Injectable } from '@nestjs/common';
import { CreateCommonPostDto } from './dto/create-common-post.dto';
import { PostType } from '@prisma/client';

@Injectable()
export class BlogPostFactory implements EntityFactory<BlogPostEntity> {
  public create(entityPlainData: Post): BlogPostEntity {
    return new BlogPostEntity(entityPlainData);
  }

  public static createNewPost(dto: CreateCommonPostDto, tags: Tag[]): BlogPostEntity {
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
    newPost.video = (dto.type === PostType.VIDEO) ? {url: dto.url} : undefined;
    newPost.photo = (dto.type === PostType.PHOTO) ? { path: dto.path} : undefined;
    newPost.link = (dto.type === PostType.LINK) ? { url: dto.url, description: dto.description} : undefined;
    newPost.quote = (dto.type === PostType.QUOTE) ? { author: dto.author, content: dto.content} : undefined;
    newPost.text = (dto.type === PostType.TEXT) ? { title: dto.title, preview: dto.preview, content: dto.content} : undefined;

    return newPost;
  }
}
