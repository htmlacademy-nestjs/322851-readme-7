import { Controller } from '@nestjs/common';
import { EmailSubscriberService } from './email-subscriber.service';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq'
import { RabbitRouting } from '@project/shared-core';
import { MailService } from '../mail-module/mail.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { NotifyDto } from './dto/notify.dto';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailSerivce: MailService
  ) {}

  @RabbitSubscribe({
    exchange: 'readme.notify',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'readme.notify.create',
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
    this.mailSerivce.sendNotifyNewSubscriber(subscriber);
  }

  @RabbitSubscribe({
    exchange: 'readme.notify',
    routingKey: RabbitRouting.AddSubscription,
    queue: 'readme.notify.update',
  })
  public async update(dto: CreateSubscriptionDto) {
    this.subscriberService.updateSubscriber(dto);
  }

  @RabbitSubscribe({
    exchange: 'readme.notify',
    routingKey: RabbitRouting.SendPostByEmail,
    queue: 'readme.notify.send',
  })
  public async sendEmail(dto: NotifyDto) {
    const {filteredPosts , subscriber} = await this.subscriberService.filterPosts(dto);

    this.mailSerivce.sendPostsToSubscriber(filteredPosts, subscriber);

  }
}
