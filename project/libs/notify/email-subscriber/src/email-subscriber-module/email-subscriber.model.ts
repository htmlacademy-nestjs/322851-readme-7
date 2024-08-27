import { Subscriber } from "@project/shared-core";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from "mongoose";


@Schema({
  collection: 'subscribers',
  timestamps: true,
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
})
export class EmailSubscriberModel extends Document implements Subscriber {
  @Prop({required: true})
  email: string;

  @Prop({required: true})
  name: string;

  @Prop({required: false, default: []})
  subscriptions?: string[]

  @Prop({required: false, default: new Date()})
  lastEmailDate?: Date

  @Prop({ required: true })
  subscriberId: string

  id?: string;
}

export const EmailSubscriberSchema = SchemaFactory.createForClass(EmailSubscriberModel);

EmailSubscriberSchema.virtual('id').get(function() {
  return this._id.toString();
})
