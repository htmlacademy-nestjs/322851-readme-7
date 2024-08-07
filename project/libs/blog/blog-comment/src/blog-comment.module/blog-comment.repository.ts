import { BasePostgresRepository } from '@project/data-access';
import { BlogCommentEntity } from './blog-comment.entity';
import { Comment } from '@project/shared-core';
import { BlogCommentFactory } from './blog-comment.factory';
import { PrismaClientService } from '@project/blog-models';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class BlogCommentRepository extends BasePostgresRepository<BlogCommentEntity, Comment> {
  constructor(
    entityFactory: BlogCommentFactory,
    client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  public async save(entity: BlogCommentEntity): Promise<void> {
    const record = await this.client.comment.create({ data: {...entity.toPOJO()} } );

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

  public async findByPostId(postId: string): Promise<BlogCommentEntity[]> {
    const records = await this.client.comment.findMany({ where: { postId } });

    return records.map((record) => this.createEntityFromDocument(record));
  }
}
