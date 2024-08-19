import { Module } from '@nestjs/common';
import {  AccountNotifyService } from './account-notify.service';
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
    AccountNotifyService
  ],
  exports: [
    AccountNotifyService
  ]
})
export class AccountNotifyModule {}
