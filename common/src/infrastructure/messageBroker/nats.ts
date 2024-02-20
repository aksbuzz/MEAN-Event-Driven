import { NatsConnection, connect as natsConnect } from 'nats';

class Nats {
  private _nc?: NatsConnection;
  async connect({ servers }: { servers: string | string[] }) {
    this._nc = await natsConnect({ servers });
    console.log(`connected to ${this._nc.getServer()}`);
  }

  async close() {
    const done = this.nc.closed();
    await this.nc.close();
    const err = await done;
    if (err) {
      console.log('error closing:', err);
    }
  }

  public get nc() {
    if (!this._nc) {
      throw new Error('Cannot access NATS client before connecting');
    }

    return this._nc;
  }
}

export const nats = new Nats();
