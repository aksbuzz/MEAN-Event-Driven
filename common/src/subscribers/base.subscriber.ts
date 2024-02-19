import { NatsConnection, StringCodec, Subscription, SubscriptionOptions } from 'nats';
import { BaseEvent } from '../events';

export abstract class BaseSubscriber<T extends BaseEvent> {
  private nc: NatsConnection;
  abstract subject: T['subject'];
  abstract onMessage(data: T['data']): void;
  private sc = StringCodec();

  constructor(nc: NatsConnection) {
    this.nc = nc;
  }

  public subscribe(options?: SubscriptionOptions) {
    const sub = this.nc.subscribe(this.subject, options);
    this.process(sub);
  }

  private async process(sub: Subscription) {
    for await (const m of sub) {
      const data = JSON.parse(this.sc.decode(m.data));
      this.onMessage(data);
    }
  }
}
