import { BasePostgresRepository } from '@project/data-access';
import { BlogCommentEntity } from './blog-comment.entity';
import { Comment, PaginationResult } from '@project/shared-core';
import { BlogCommentFactory } from './blog-comment.factory';
import { PrismaClientService } from '@project/blog-models';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogCommentQuery } from '../blog-comment-query';
import { Prisma } from '@prisma/client';

@Injectable()
export class BlogCommentRepository extends BasePostgresRepository<BlogCommentEntity, Comment> {
  constructor(
    entityFactory: BlogCommentFactory,
    client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  private async countPostComments(where: Prisma.CommentWhereInput) {
    return this.client.comment.count({ where });
  }

  private calculateCommentPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount/limit);
  }

  public async save(entity: BlogCommentEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();
    const record = await this.client.comment.create({
      data: {
        text: pojoEntity.text,
        userId: pojoEntity.userId,
        post: {
          connect: {
            id: entity.postId
          }
        }
      },
    });

    entity.id = record.id;
  }

  public async findById(id: string): Promise<BlogCommentEntity> {
    const record = await this.client.comment.findFirst({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Comment with id ${id} nof found`);
    }

    return this.createEntityFromDocument(record);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.comment.delete({ where: { id } });
  }

  public async findByPostId(postId: string, query: BlogCommentQuery): Promise<PaginationResult<BlogCommentEntity>> {
    const skip = (query?.page && query?.limit) ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.CommentWhereInput = { postId };
    const orderBy: Prisma.CommentOrderByWithRelationInput = {};

    if (query?.sortDirection) {
      orderBy.createdAt = query.sortDirection
    }

    const [records, commentsCount] = await Promise.all([
      this.client.comment.findMany({ where, skip, take, orderBy }),
      this.countPostComments(where)
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: this.calculateCommentPage(commentsCount, take),
      itemsPerPage: take,
      totalItems: commentsCount
    }
  }
}
