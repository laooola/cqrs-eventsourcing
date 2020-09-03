import { EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';

import { BookingCreatedEvent } from '../booking-created.event';
import { BookingStateChangedEvent } from '../booking-state-changed.event';
import { BookingUpdatedEvent } from '../booking-updated.event';

@EventsHandler(
  BookingCreatedEvent,
  BookingStateChangedEvent,
  BookingUpdatedEvent,
)
export class BookingCreatedHandler implements IEventHandler {
  handle(event: IEvent) {
    console.log('Received event', event);
  }
}
