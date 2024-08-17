import { Like } from '@project/shared-core';
import { BasePostgresRepository } from '@project/data-access'
import { BlogLikeEntity } from './blog-like.entity';
import { BlogLikeFactory } from './blog-like.factory';
import { PrismaClientService } from '@project/blog-models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogLikeRepository extends BasePostgresRepository<BlogLikeEntity, Like> {

  constructor(
    likeFactory: BlogLikeFactory,
    protected readonly client: PrismaClientService
  ) {
    super(likeFactory, client);
  }

  public async save(entity: BlogLikeEntity): Promise<void> {
    await this.client.like.create({
      data: {
        ...entity.toPOJO()
      }
    });
  }

  public async deleteByIds({userId, postId}: Like): Promise<void> {
    await this.client.like.delete({
      where: {
         userId_postId: {
          postId,
          userId
         }
      }
    })
  }
}
