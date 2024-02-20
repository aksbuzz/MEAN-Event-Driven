import { NatsConnection, RequestOptions } from 'nats';
import { BaseEvent } from '../events';
import { Codec } from '../util/codec';

// we can't create instance of abstract class
export abstract class BasePublisher<T extends BaseEvent> {
  private nc: NatsConnection;
  // non-abstract class have to define this
  abstract subject: T['subject'];
  private sc = new Codec<T['data']>();

  constructor(nc: NatsConnection) {
    this.nc = nc;
  }

  public publish(data: T['data']) {
    console.log(`publishing event ${this.subject} with data: ${JSON.stringify(data)}`);
    this.nc.publish(this.subject, this.sc.encode(data));
  }

  public async request(data: T['data'], options?: RequestOptions) {
    try {
      const req = await this.nc.request(this.subject, this.sc.encode(data), options);
      return this.sc.decode(req.data);
    } catch (error) {
      throw new Error();
    }
  }
}
