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
    const foundEntity = await this.model.findOne({email}).exec();

    if (! foundEntity) {
      return null;
    }

    return this.createEntityFromDocument(foundEntity);
  }

  public async updatePassword(id: string, password: string): Promise<void> {
    await this.model.updateOne({_id: id}, {passwordHash: password}).exec();
  }
}
