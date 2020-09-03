import { Inject, Injectable } from '@nestjs/common';
import { IEvent } from '@nestjs/cqrs';

import { StorableEvent } from './event/storable-event';
import * as events from './event';

@Injectable()
export class EventStore<E extends StorableEvent = StorableEvent> {
  constructor(@Inject('EVENT_DATA') private data: any[]) {}

  private getEventFromRaw(raw: any): E {
    const cls = events[raw.type];
    if (!cls) {
      throw new Error(`Event type does not exist: ${raw.type}`);
    }
    return cls.fromRaw(raw);
  }

  async getStreamEvents(
    streamName: string,
    position: number,
    batchSize: number,
    time?: Date,
  ): Promise<E[]> {
    // use http://docs.eventide-project.org/user-guide/message-db/server-functions.html#get-messages-from-a-stream
    let stream = this.data.filter(e => e.stream_name === streamName);
    if (time) {
      stream = stream.filter(e => new Date(e.time) <= time);
    }
    return stream
      .slice(position, position + batchSize)
      .map(raw => this.getEventFromRaw(raw));
  }

  async store(event: E): Promise<void> {
    this.data.push(event.toRaw());
    console.log('stored event', event)
  }
}
