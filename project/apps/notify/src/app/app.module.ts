import { Module } from '@nestjs/common';
import { getMongooseOptions, NotifyConfigModule } from '@project/notify-config';
import { EmailSubscriberModule } from '@project/email-subscriber';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMqOptions } from '@project/shared-helpers';


@Module({
  imports: [
    MongooseModule.forRootAsync(getMongooseOptions()),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMqOptions('application.rabbit')
    ),
    EmailSubscriberModule,
    NotifyConfigModule
  ],
})
export class AppModule {}
