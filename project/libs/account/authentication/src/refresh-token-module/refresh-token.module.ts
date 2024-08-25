import { Module } from '@nestjs/common';
import { RefreshTokenFactory } from './refresh-token.factory';
import { RefreshTokenRepository } from './refresh-token.repository';
import { RefreshTokenService } from './refresh-token.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshTokenModel, RefreshTokenSchema } from './refresh-token.model';

@Module({
  imports: [
    MongooseModule.forFeature([
    {schema: RefreshTokenSchema, name: RefreshTokenModel.name}
  ])
],
  providers: [
    RefreshTokenFactory,
    RefreshTokenRepository,
    RefreshTokenService
  ],
  exports: [
    RefreshTokenService
  ]
})
export class RefreshTokenModule {}
