import { Module } from '@nestjs/common';
import { EmailSubscriberFactory } from './email-subscriber.factory';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { EmailSubscriberService } from './email-subscriber.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailSubscriberModel, EmailSubscriberSchema } from './email-subscriber.model';
import { MailModule } from '../mail-module/mail.module';
import { EmailSubscriberController } from './email-subscriber.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMqOptions } from '@project/shared-helpers';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: EmailSubscriberModel.name, schema: EmailSubscriberSchema }]
    ),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMqOptions('application.rabbit')
    ),
    MailModule
  ],
  providers: [
    EmailSubscriberFactory,
    EmailSubscriberRepository,
    EmailSubscriberService
  ],
  controllers: [
    EmailSubscriberController
  ]
})
export class EmailSubscriberModule {}
