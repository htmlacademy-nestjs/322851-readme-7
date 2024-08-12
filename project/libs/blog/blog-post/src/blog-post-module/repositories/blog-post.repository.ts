import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/data-access';
import { BlogPostEntity } from '../blog-post.entity';
import { PaginationResult, Post } from '@project/shared-core';
import { BlogPostFactory } from '../blog-post.factory';
import { PrismaClientService } from '@project/blog-models';
import { Prisma, PostType } from '@prisma/client';
import { BlogPostQuery } from '../blog-post.query';

@Injectable()
export class BlogPostRepository extends BasePostgresRepository<BlogPostEntity, Post> {
  constructor(
    entityFactory: BlogPostFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({ where });
  }

  private calculatePostPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount/limit);
  }

  public async save(entity: BlogPostEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();
    console.log(entity);
    const record = await this.client.post.create({
      data: {
        type: pojoEntity.type as PostType,
        userId: pojoEntity.userId,
        isPublished: pojoEntity.isPublished,
        isRepost: pojoEntity.isRepost,
        originalAuthor: pojoEntity.originalAuthor,
        originalId: pojoEntity.originalId,
        likesCount: pojoEntity.likesCount,
        commentsCount: pojoEntity.commentsCount,
        tags: {
          connect: pojoEntity.tags.map(({id}) => ({ id }))
        },
        comments: {
          create: []
        },
        likes: {
          create: []
        },
        video: entity.video ? { create: { ...entity.video  }} : undefined,
        link: entity.link ? { create: { ...entity.link  }} : undefined,
        quote: entity.quote ? { create: { ...entity.quote  }} : undefined,
        text: entity.text ? { create: { ...entity.text  }} : undefined,
        photo: entity.photo ? { create: { ...entity.photo  }} : undefined
      },
      include: {
          tags: true,
          likes: true,
          video: true,
          link: true,
          quote: true,
          text: true,
          photo: true
      }
    });

    entity.id = record.id;
  }

  public async find(query?: BlogPostQuery): Promise<PaginationResult<BlogPostEntity>> {
    const skip = (query?.page && query?.limit) ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    if (query?.tags) {
      where.tags = {
        some: {
          id: {
            in: query.tags
          }
        }
      }
    }

    if (query?.sortDirection) {
      orderBy.createdAt = query.sortDirection
    }

    const [records, postsCount] = await Promise.all([
      this.client.post.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          tags: true,
          likes: true,
          video: true,
          link: true,
          quote: true,
          text: true,
          photo: true
        }
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: this.calculatePostPage(postsCount, take),
      itemsPerPage: take,
      totalItems: postsCount
    }
  }

  public async findById(id: string): Promise<BlogPostEntity> {
    const document = await this.client.post.findFirst({
      where: {
        id,
      },
      include: {
        tags: true,
        likes: true,
        video: true,
        link: true,
        quote: true,
        text: true,
        photo: true
      }
    });

    if (! document) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return this.createEntityFromDocument(document);
  }

  public async update(entity: BlogPostEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();
    await this.client.post.update({
      where: {
        id: pojoEntity.id
      },
      data: {
        type: pojoEntity.type as PostType,
        userId: pojoEntity.userId,
        isPublished: pojoEntity.isPublished,
        isRepost: pojoEntity.isRepost,
        originalAuthor: pojoEntity.originalAuthor,
        originalId: pojoEntity.originalId,
        likesCount: pojoEntity.likesCount,
        commentsCount: pojoEntity.commentsCount,
        tags: {
          connect: pojoEntity.tags.map(({id}) => ({ id }))
        },
      },
      include: {
        likes: true,
        video: true,
        link: true,
        quote: true,
        text: true,
        photo: true,
      }
    });
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id,
      }
    });
  }
}
