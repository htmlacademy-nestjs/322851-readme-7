import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogPostQuery } from './blog-post.query';
import { BlogPostEntity } from './blog-post.entity';
import { PaginationResult } from '@project/shared-core';
import { BlogTagService } from 'libs/blog/blog-tag/src/blog-tag-module/blog-tag.service';
import { BlogPostFactory } from './blog-post.factory';
import { BlogPostRepository } from './repositories/blog-post.repository';
import { CreateCommonPostDto } from './dto/create-common-post.dto';
import { UpdateCommonPostDto } from './dto/update-common-post.dto';

@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
    private readonly blogTagService: BlogTagService
  ) {}

  public async getAll(query?: BlogPostQuery): Promise<PaginationResult<BlogPostEntity>> {
    return this.blogPostRepository.find(query);
  }

  public async getPost(id: string): Promise<BlogPostEntity> {
    return this.blogPostRepository.findById(id);
  }

  public async createPost(dto: CreateCommonPostDto): Promise<BlogPostEntity> {
    //const tags = await this.blogTagService.getTagsByIds(dto.tags);

    const newPost = BlogPostFactory.createNewPost(dto, dto.tags = []);

    await this.blogPostRepository.save(newPost);



    return newPost;
  }

  public async updatePost(id: string, dto: UpdateCommonPostDto): Promise<BlogPostEntity> {
    const existsPost = await this.blogPostRepository.findById(id);
    let isSameTags = true;
    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (key !== undefined && key !== 'tags' && existsPost[key] !== value) {
        existsPost[key] = value;
        hasChanges = true;
      }

      if (key === 'tags' && value) {
        const currentTagsIds = existsPost.tags.map((tag) => tag.id);
        isSameTags = currentTagsIds.length === value.length && currentTagsIds.some((tagId) => value.includes(tagId));
      }

      if (! isSameTags) {
        existsPost.tags = await this.blogTagService.getTagsByIds(dto.tags);
      }

      if (isSameTags && ! hasChanges) {
        return existsPost
      }

      await this.blogPostRepository.update(existsPost);

      return existsPost;
    }

  }

  public async deletePost(id: string): Promise<void> {
    try {
      await this.blogPostRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
  }

}
