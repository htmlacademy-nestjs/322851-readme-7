import { Inject, Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { rabbitConfig } from '@project/account-config';
import { ConfigType } from '@nestjs/config';
import { RabbitRouting } from '@project/shared-core';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Injectable()
export class AccountNotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>
  ) {}

  public async registerSubscriber(dto: CreateSubscriberDto) {
    return this.rabbitClient.publish<CreateSubscriberDto>(
      this.rabbitOptions.exchange,
      RabbitRouting.AddSubscriber,
      { ...dto }
    )
  }

  public async updateSubscription(dto: CreateSubscriptionDto) {
    return this.rabbitClient.publish<CreateSubscriptionDto>(
      this.rabbitOptions.exchange,
      RabbitRouting.AddSubscription,
      { ...dto }
    )
  }
}
