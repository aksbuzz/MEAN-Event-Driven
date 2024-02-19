import { NatsConnection, StringCodec } from 'nats';
import { BaseEvent } from '../events';

// we can't create instance of abstract class
export abstract class BasePublisher<T extends BaseEvent> {
  private nc: NatsConnection;
  // non-abstract class have to define this
  abstract subject: T['subject'];
  private sc = StringCodec();

  constructor(nc: NatsConnection) {
    this.nc = nc;
  }

  public publish(data: T['data']) {
    this.nc.publish(this.subject, this.sc.encode(JSON.stringify(data)));
  }
}
