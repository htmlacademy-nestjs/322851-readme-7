import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { BlogPostQuery } from './blog-post.query';
import { BlogPostEntity } from './blog-post.entity';
import { PaginationResult } from '@project/shared-core';
import { BlogTagService } from 'libs/blog/blog-tag/src/blog-tag-module/blog-tag.service';
import { BlogPostFactory } from './blog-post.factory';
import { BlogPostRepository } from './repositories/blog-post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
    private readonly blogTagService: BlogTagService
  ) {}

  public async getAll(query?: BlogPostQuery, userIds?: string[]): Promise<PaginationResult<BlogPostEntity>> {
    return this.blogPostRepository.find(query, userIds);
  }

  public async getPost(id: string): Promise<BlogPostEntity> {
    return this.blogPostRepository.findById(id);
  }

  public async createPost(dto: CreatePostDto): Promise<BlogPostEntity> {
    const tags = await this.blogTagService.findOrCreate(dto.tags);

    const newPost = BlogPostFactory.createNewPost(dto, tags);

    await this.blogPostRepository.save(newPost);

    return newPost;
  }

  public async createRepost(postId: string, userId: string): Promise<BlogPostEntity> {
    const existsPost = await this.blogPostRepository.findById(postId);

    if (! existsPost) {
      throw new NotFoundException(`Post with id ${postId} not found`);
    }

    const existRepost = await this.blogPostRepository.findRepost(postId, userId);

    if (existRepost) {
      throw new ConflictException(`You had already made this repost`);
    }

    const newPost = BlogPostFactory.createRepost(existsPost.toPOJO(), userId);

    console.log('newPost: ', newPost)

    await this.blogPostRepository.save(newPost);

    return newPost;
  }

  public async updatePost(id: string, dto: UpdatePostDto): Promise<BlogPostEntity> {
    const existsPost = await this.blogPostRepository.findById(id);
    if (dto.userId !== existsPost.userId) {
      throw new ConflictException(`You are not allowed to update this post`);
    }
    let isSameTags = true;
    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (key !== undefined && key !== 'tags' && existsPost[key] !== value) {
        existsPost[key] = value;
        hasChanges = true;
      }

      if (key === 'tags' && value) {
        const currentTagsTitles = existsPost.tags.map((tag) => tag.title);
        isSameTags = currentTagsTitles.length === value.length && currentTagsTitles.every((title) => value.includes(title));
      }
    }

      if (isSameTags && ! hasChanges) {
        return existsPost
      }

      if (! isSameTags) {
        existsPost.tags = await this.blogTagService.findOrCreate([...dto.tags, ...existsPost.tags.map((tag) => tag.title)]);
      }

      await this.blogPostRepository.update(existsPost);

      return existsPost;
  }

  public async deletePost(postId: string, userId: string): Promise<void> {
    const existsPost = await this.blogPostRepository.findById(postId);
    if (userId !== existsPost.userId) {
      throw new ConflictException(`You are not allowed to delete this post`);
    }
    try {
        await this.blogPostRepository.deleteById(postId);
    } catch(err) {
      throw new NotFoundException(`Post with id ${postId} not found`);
    }
  }
}
