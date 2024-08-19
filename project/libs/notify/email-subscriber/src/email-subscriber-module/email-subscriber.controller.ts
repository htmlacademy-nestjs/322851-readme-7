import { Controller } from "@nestjs/common";
import { EmailSubscriberService } from "./email-subscriber.service";
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq'
import { RabbitRouting } from "@project/shared-core";
import { MailService } from "../mail-module/mail.service";
import { CreateSubscriberDto } from "./dto/create-subscriber.dto";

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailSerivce: MailService
  ) {}

  @RabbitSubscribe({
    exchange: 'readme.notify.income',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'readme.notify.income',
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
    this.mailSerivce.sendNotifyNewSubscriber(subscriber);
  }
}
