import { IEvent } from '@nestjs/cqrs';
import * as uuid from 'uuid';

export class StorableEvent<D = any, M = any> implements IEvent {
  id: string;
  streamName: string;
  type: string;
  data: D;
  metadata: M;
  time: Date;

  static fromRaw<D, M>(raw: any): StorableEvent<D, M> {
    const event = new this(raw.stream_name, raw.data, raw.metadata);
    event.id = raw.id;
    event.time = new Date(raw.time);
    return event;
  }

  constructor(streamName: string, data: D, metadata: M) {
    this.id = uuid.v4();
    this.streamName = streamName;
    this.type = this.constructor.name;
    this.data = data;
    this.metadata = metadata;
    this.time = new Date();
  }

  toRaw(): any {
    return {
      id: this.id,
      stream_name: this.streamName,
      type: this.type,
      data: this.data,
      metadata: this.metadata,
      time: this.time.toISOString(),
    };
  }
}
