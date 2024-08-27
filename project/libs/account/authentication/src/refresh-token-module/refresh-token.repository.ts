import { BaseMongoRepository } from '@project/data-access';
import { RefreshTokenEntity } from './refresh-token.entity';
import { RefreshTokenModel } from './refresh-token.model';
import { RefreshTokenFactory } from './refresh-token.factory';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenRepository extends BaseMongoRepository<RefreshTokenEntity, RefreshTokenModel> {
  constructor(
    protected readonly tokenFactory: RefreshTokenFactory,
    @InjectModel(RefreshTokenModel.name) tokenModel: Model<RefreshTokenModel>
  ) {
    super(tokenFactory, tokenModel);
  }

  public async findByTokenId(tokenId: string): Promise<RefreshTokenEntity | null> {
    const document = await this.model.findOne({tokenId: tokenId}).exec();

    return document ? this.createEntityFromDocument(document) : null;
  }

  public async deleteByTokenId(tokenId: string) {
    return this.model.deleteOne({ tokenId }).exec();
  }

  public async deleteExpiredTokens(): Promise<void> {
    await this.model.deleteMany({ expiresIn: {$lt: new Date()}})
  }
}
