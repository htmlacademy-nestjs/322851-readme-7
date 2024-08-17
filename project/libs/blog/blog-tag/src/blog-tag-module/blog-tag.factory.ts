import { EntityFactory, Tag } from '@project/shared-core';
import { BlogTagEntity } from './blog-tag.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogTagFactory implements EntityFactory<BlogTagEntity> {
  public create(entityPlainData: Tag): BlogTagEntity {
    return new BlogTagEntity(entityPlainData);
  }
}
