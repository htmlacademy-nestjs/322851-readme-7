import { Comment, EntityFactory } from '@project/shared-core';
import { BlogCommentEntity } from './blog-comment.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogCommentFactory implements EntityFactory<BlogCommentEntity> {
  public create(entityPlainData: Comment): BlogCommentEntity {
    return new BlogCommentEntity(entityPlainData);
  }
}
