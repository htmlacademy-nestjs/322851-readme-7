import { Injectable } from '@nestjs/common';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberEntity } from './email-subscriber.entity';

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
}
