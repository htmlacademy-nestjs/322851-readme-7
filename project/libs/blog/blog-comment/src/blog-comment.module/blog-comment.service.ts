import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogCommentEntity } from './blog-comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { BlogCommentQuery } from './blog-comment-query';
import { PaginationResult } from '@project/shared-core';
import { BlogCommentFactory } from './blog-comment.factory';
import { BlogCommentRepository } from './blog-comment.repository';
import { BlogPostRepository } from 'libs/blog/blog-post/src/blog-post-module/repositories/blog-post.repository';
import { BlogPostService } from '@project/blog-post';

@Injectable()
export class BlogCommentService {
  constructor (
    private commentFactory: BlogCommentFactory,
    private readonly commentRepository: BlogCommentRepository,
    private readonly blogPostService: BlogPostService
  ) {}

  public async getComments(postId: string, query?: BlogCommentQuery): Promise<PaginationResult<BlogCommentEntity>> {
    const existPost = await this.blogPostService.getPost(postId);

    if (! existPost) {
      throw new NotFoundException(`Post with id ${postId} not found`);
    }

    return this.commentRepository.findByPostId(postId, query);
  }

  public async createComment(dto: CreateCommentDto, postId: string): Promise<BlogCommentEntity> {
    const existPost = await await this.blogPostService.getPost(postId);

    if (! existPost) {
      throw new NotFoundException(`Post with id ${postId} not found`);
    }

    const newComment = this.commentFactory.create({...dto, postId});
    await this.commentRepository.save(newComment);

    return newComment;
  }

  public async deleteComment(id: string): Promise<void> {
    try {
      await this.commentRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Comment with id #{id} not found`);
    }
  }
}
