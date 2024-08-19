import { EntityFactory, Subscriber } from "@project/shared-core";
import { EmailSubscriberEntity } from "./email-subscriber.entity";
import { Injectable } from "@nestjs/common";


@Injectable()
export class EmailSubscriberFactory implements EntityFactory<EmailSubscriberEntity> {
  create(entityPlainData: Subscriber): EmailSubscriberEntity {
    return new EmailSubscriberEntity(entityPlainData);
  }
}
