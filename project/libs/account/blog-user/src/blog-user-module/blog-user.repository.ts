import { BaseMongoRepository } from '@project/data-access';
import { BlogUserEntity } from './blog-user.entity';
import { BlogUserFactory } from './blog-user.factory';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BlogUserModel } from './blog-user.model';
import { Model } from 'mongoose';

@Injectable()
export class BlogUserRepository extends BaseMongoRepository<BlogUserEntity, BlogUserModel> {
  constructor(
    entityFactory: BlogUserFactory,
    @InjectModel(BlogUserModel.name) blogUserModel: Model<BlogUserModel>
  ) {
    super(entityFactory, blogUserModel);
  }

  public async findByEmail(email: string): Promise<BlogUserEntity | null> {
    const found_entity = await this.model.findOne({email}).exec();

    if (! found_entity) {
      return null;
    }

    return this.createEntityFromDocument(found_entity);
  }
}
