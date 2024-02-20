import { NatsConnection, Subscription, SubscriptionOptions } from 'nats';
import { BaseEvent } from '../events';
import { Codec } from '../util/codec';

export abstract class BaseSubscriber<T extends BaseEvent> {
  private nc: NatsConnection;
  abstract subject: T['subject'];
  abstract onMessage(data: T['data'], respond?: (value: unknown) => void): void;
  private sc = new Codec<T['data']>();

  constructor(nc: NatsConnection) {
    this.nc = nc;
  }

  public subscribe(options?: SubscriptionOptions) {
    const sub = this.nc.subscribe(this.subject, options);
    this.process(sub);
  }

  private async process(sub: Subscription) {
    console.log(`processing subscription for ${this.subject}`);
    for await (const m of sub) {
      const data = this.sc.decode(m.data);
      this.onMessage(data, (value: unknown) => {
        m.respond(this.sc.encode(value));
      });
    }
  }
}
