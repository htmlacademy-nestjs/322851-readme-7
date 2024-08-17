import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BlogLikeRepository } from './blog-like.repository';
import { Like } from '@project/shared-core';
import { BlogLikeFactory } from './blog-like.factory';

@Injectable()
export class BlogLikeService {
  constructor(
    private readonly likeFactory: BlogLikeFactory,
    private readonly blogLikeRepository: BlogLikeRepository
  ) {}

  public async addLike(like: Like): Promise<void> {
    const newLike = this.likeFactory.create(like);
    try {
      await this.blogLikeRepository.save(newLike);
    } catch {
      throw new BadRequestException(`Like already exist`)
    }

  }

  public async removeLike(like) {
    try {
      await this.blogLikeRepository.deleteByIds(like);
    } catch {
      throw new NotFoundException(`Like not found`);
    }
  }
}

