import { Injectable } from '@nestjs/common';
import { EventBus, IEvent, IEventBus } from '@nestjs/cqrs';

import { StorableEvent } from './event/storable-event';
import { EventStore } from './event-store';

@Injectable()
export class EventSourcingBus implements IEventBus {
  constructor(
    private readonly eventStore: EventStore,
    private readonly eventBus: EventBus,
  ) {}

  async publish<T extends IEvent>(event: T): Promise<void> {
    if (!(event instanceof StorableEvent)) {
      throw new Error(`Event is not storable: ${event}`);
    }
    await this.eventStore.store(event as StorableEvent);
    await this.eventBus.publish(event);
  }

  async publishAll(events: IEvent[]): Promise<void> {
    await Promise.all(events.map(event => this.publish(event)));
  }
}
