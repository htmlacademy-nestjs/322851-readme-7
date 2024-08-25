import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { JwtToken } from '@project/shared-core';
import { Document } from 'mongoose';


@Schema({
  collection: 'refresh-tokens',
  timestamps: true,
  toObject: {virtuals: true},
  toJSON: {virtuals: true}
})
export class RefreshTokenModel extends Document implements  JwtToken {
  createdAt: Date;

  @Prop({required: true})
  tokenId: string;

  @Prop({required: true})
  userId: string;

  @Prop({required: true})
  expiresIn: Date;
}


export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshTokenModel);

