import { BasePostgresRepository } from '@project/data-access';
import { BlogTagEntity } from './blog-tag.entity';
import { Tag } from '@project/shared-core';
import { PrismaClientService } from '@project/blog-models';
import { BlogTagFactory } from './blog-tag.factory';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TagFilter, tagFilterToPrismaFilter } from './blog-tag.filter';

@Injectable()
export class BlogTagRepository extends BasePostgresRepository<BlogTagEntity, Tag> {
  constructor(
    entityFactory: BlogTagFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: BlogTagEntity): Promise<void> {
    const record = await this.client.tag.create({
      data: {... entity.toPOJO()}
    })

    entity.id = record.id;
  }

  public async findbyId(id: string): Promise<BlogTagEntity> {
    const document = await this.client.tag.findFirst({
      where: {
        id,
      },
    })

    if (!document) {
      throw new NotFoundException(`Tag with id ${id} not found`);
    }

    return this.createEntityFromDocument(document);
  }

  public async find(filter?: TagFilter): Promise<BlogTagEntity[]> {
    const where = filter ?? tagFilterToPrismaFilter(filter);

    const records = await this.client.tag.findMany({
      where
    })

    return records.map((record) => this.createEntityFromDocument(record));
  }

  public async findByIds(ids?: string[]): Promise<BlogTagEntity[]> {
    const records = await this.client.tag.findMany({
      where: {
        id: {
          in: ids,
        }
      },
    });

    return records.map((record) => this.createEntityFromDocument(record));
  }

  public async findByTitles(titles: string[]): Promise<BlogTagEntity[]> {
    const records = await this.client.tag.findMany({
      where: {
        title: {
          in: titles,
        }
      }
    });

    return records.map((record) => this.createEntityFromDocument(record));
  }

  public async createMany(tags: Tag[]): Promise<BlogTagEntity[]> {
    const records = await this.client.tag.createManyAndReturn({
      data: [
        ...tags
      ]
    });

    return records.map((record) => this.createEntityFromDocument(record));
  }

}




