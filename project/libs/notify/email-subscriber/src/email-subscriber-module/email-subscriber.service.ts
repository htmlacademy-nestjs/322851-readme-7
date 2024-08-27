import { Injectable, NotFoundException } from '@nestjs/common';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { NotifyDto } from './dto/notify.dto';


@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly subscriberRepository: EmailSubscriberRepository
  ) {}

  public async addSubscriber(dto: CreateSubscriberDto): Promise<EmailSubscriberEntity> {
    const existSubscriber = await this.subscriberRepository.findByEmail(dto.email);

    if (existSubscriber) {
      return existSubscriber;
    }

    const newSubscriber = new EmailSubscriberEntity(dto);
    await this.subscriberRepository.save(newSubscriber);
    return newSubscriber;
  }

  public async filterPosts(dto: NotifyDto) {
    const existSubscriber = await this.subscriberRepository.findBySubscriberId(dto.subscriberId);

    if (!existSubscriber) {
      throw new NotFoundException(`Subscriber with id ${dto.subscriberId} not found`);
    }

    const filteredPosts = dto.posts.filter((post) => {
      return (new Date(post.createdAt) >= existSubscriber.lastEmailDate
                && existSubscriber.subscriptions.includes(post.userId))
    });

    existSubscriber.lastEmailDate = new Date();
    await this.subscriberRepository.update(existSubscriber);

    return {
      filteredPosts,
      subscriber: existSubscriber
    }
  }

  public async updateSubscriber(dto: CreateSubscriptionDto): Promise<void> {
    const existSubscriber = await this.subscriberRepository.findByEmail(dto.userEmail);

    if (!existSubscriber) {
      throw new NotFoundException(`Subscriber with email ${dto.userEmail} not found`);
    }

    if (existSubscriber.subscriptions.includes(dto.subscriptionId)) {
      existSubscriber.subscriptions = existSubscriber.subscriptions.filter((id) => id !== dto.subscriptionId);
    } else {
      existSubscriber.subscriptions.push(dto.subscriptionId);
    }

    await this.subscriberRepository.update(existSubscriber);
  }
}
