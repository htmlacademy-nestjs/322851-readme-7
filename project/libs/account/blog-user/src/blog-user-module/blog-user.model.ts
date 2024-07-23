import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AuthUser } from "@project/shared-core";
import { Document } from "mongoose";

@Schema({
  collection: 'accounts',
  timestamps: true
})
export class BlogUserModel extends Document implements AuthUser {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  avatar?: string;

  @Prop({ required: true })
  passwordHash: string;
}

export const blogUserSchema = SchemaFactory.createForClass(BlogUserModel);
