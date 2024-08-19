import { InjectModel } from '@nestjs/mongoose';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { EmailSubscriberFactory } from './email-subscriber.factory';
import { EmailSubscriberModel } from './email-subscriber.model';
import { BaseMongoRepository } from '@project/data-access';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailSubscriberRepository extends BaseMongoRepository<EmailSubscriberEntity, EmailSubscriberModel> {
  constructor(
    subscriberFactory: EmailSubscriberFactory,
    @InjectModel(EmailSubscriberModel.name) subscriberModel: Model<EmailSubscriberModel>
  ) {
    super(subscriberFactory, subscriberModel);
  }

  public async findByEmail(email: string): Promise<EmailSubscriberEntity | null> {
    const document = await this.model.findOne({email}).exec();
    return this.createEntityFromDocument(document);
  }
}
