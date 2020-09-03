import { Injectable } from '@nestjs/common';
import { IEvent, AggregateRoot } from '@nestjs/cqrs';

import { EventSourcingBus } from './event-sourcing-bus';

export interface Constructor<T> {
  new (...args: any[]): T;
}

@Injectable()
export class EventSourcingPublisher {
  constructor(private readonly eventBus: EventSourcingBus) {}

  mergeClassContext<T extends Constructor<AggregateRoot>>(metatype: T): T {
    const eventBus = this.eventBus;
    return class extends metatype {
      publish(event: IEvent) {
        eventBus.publish(event);
      }
    };
  }

  mergeObjectContext<T extends AggregateRoot>(object: T): T {
    const eventBus = this.eventBus;
    object.publish = (event: IEvent) => {
      eventBus.publish(event);
    };
    return object;
  }
}
