import { Module } from '@nestjs/common';
import {  BlogNotifyService } from './blog-notify.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMqOptions } from '@project/shared-helpers';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMqOptions('rabbit')
    )
  ],
  providers: [
    BlogNotifyService
  ],
  exports: [
    BlogNotifyService
  ]
})
export class BlogNotifyModule {}
