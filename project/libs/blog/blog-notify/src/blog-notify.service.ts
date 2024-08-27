import { Inject, Injectable } from '@nestjs/common';
import { BlogNotifyDto } from './dto/blog-notify.dto';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { rabbitConfig } from '@project/blog-config';
import { ConfigType } from '@nestjs/config';
import { Post, RabbitRouting } from '@project/shared-core';

@Injectable()
export class BlogNotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>
  ) {}


  public async sendEmail(posts: Post[], subscriberId: string) {
    return this.rabbitClient.publish<BlogNotifyDto>(
      this.rabbitOptions.exchange,
      RabbitRouting.SendPostByEmail,
      { posts, subscriberId }
    )
  }
}
