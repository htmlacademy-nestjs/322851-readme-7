import { Entity, StorableEntity, Subscriber } from '@project/shared-core';

export class EmailSubscriberEntity extends Entity implements StorableEntity<Subscriber> {
  public email: string;
  public name: string;
  public subscriptions: string[];
  public lastEmailDate: Date;
  public subscriberId: string;

  constructor(subscriber?: Subscriber) {
    super();

    this.populate(subscriber);
  }

  private populate(subscriber?: Subscriber) {
    if (subscriber) {
      this.email = subscriber.email;
      this.name = subscriber.name;
      this.lastEmailDate = subscriber.lastEmailDate ?? new Date();
      this.subscriptions = subscriber.subscriptions ?? [];
      this.id = subscriber.id ?? '';
      this.subscriberId = subscriber.subscriberId
    }
  }

  public toPOJO(): Subscriber {
    return {
      email: this.email,
      name: this.name,
      id: this.id,
      subscriptions: this.subscriptions,
      lastEmailDate: this.lastEmailDate,
      subscriberId: this.subscriberId
    }
  }

}
