export interface Subscriber {
  id?: string;
  email: string;
  name: string;
  subscriptions?: string[];
  lastEmailDate?: Date;
  subscriberId: string;
}
