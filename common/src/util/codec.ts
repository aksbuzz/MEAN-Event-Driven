import { StringCodec } from 'nats';

export class Codec<T> {
  private sc = StringCodec();

  public encode(data: T): Uint8Array {
    return this.sc.encode(JSON.stringify(data));
  }

  public decode(data: Uint8Array) {
    return JSON.parse(this.sc.decode(data));
  }
}
