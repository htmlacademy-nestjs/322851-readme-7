import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { File } from "@project/shared-core";
import { Document } from "mongoose";

@Schema({
  collection: 'files',
  timestamps: true,
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
})
export class FileModel extends Document implements File {
  @Prop({
    required: true
  })
  originalName: string;
  @Prop({
    required: true
  })
  size: number;
  @Prop({
    required: true
  })
  mimeType: string;
  @Prop({
    required: true
  })
  hashName: string;
  @Prop({
    required: true
  })
  path: string;
  @Prop({
    required: true
  })
  subDirectory: string;
  id?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const FileSchema = SchemaFactory.createForClass(FileModel);

FileSchema.virtual('id').get(function() {
  return this._id.toString();
})
