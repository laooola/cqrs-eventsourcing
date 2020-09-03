import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as CommandHandlers from './command/handler';
import { BookingState } from './common';
import * as EventHandlers from './event/handler';
import { EventSourcingBus } from './event-sourcing-bus';
import { EventSourcingPublisher } from './event-sourcing-publisher';
import { EventStore } from './event-store';
import { BookingRepository } from './repository/booking.repository';
import * as QueryHandlers from './query/handler';

const data = [
  {
    id: '623cfc2f-f01c-4f80-8403-4efb90e9cfb0',
    stream_name: 'booking-1',
    type: 'BookingCreatedEvent',
    data: {
      id: '1',
      state: BookingState.new,
      productId: '1',
      dateRange: {
        gte: new Date('2020-09-01T00:00:00.000Z'),
        lte: new Date('2020-10-01T00:00:00.000Z'),
      },
    },
    time: '2020-09-01T12:26:19.089Z',
  },
  {
    id: '78cf9ca8-a7d2-41d2-b449-3a3eeb7dd1da',
    stream_name: 'booking-1',
    type: 'BookingStateChangedEvent',
    data: {
      state: BookingState.booked,
    },
    time: '2020-09-01T12:27:17.031Z',
  },
  {
    id: '8498540f-7967-4a80-a45e-f443a4bf65e8',
    stream_name: 'booking-1',
    type: 'BookingUpdatedEvent',
    data: {
      dateRange: {
        gte: new Date('2020-09-15T00:00:00.000Z'),
        lte: new Date('2020-10-15T00:00:00.000Z'),
      },
    },
    time: '2020-09-01T14:08:11.105Z',
  },
  {
    id: '23f7118c-497d-4f30-b122-b02aec33f7b6',
    stream_name: 'booking-1',
    type: 'BookingStateChangedEvent',
    data: {
      state: BookingState.cancelled,
    },
    time: '2020-09-01T17:21:43.188Z',
  },
];

@Module({
  imports: [CqrsModule],
  controllers: [AppController],
  providers: [
    AppService,
    ...Object.values(CommandHandlers),
    ...Object.values(QueryHandlers),
    ...Object.values(EventHandlers),
    BookingRepository,
    EventSourcingBus,
    EventSourcingPublisher,
    { provide: 'EVENT_DATA', useValue: data },
    EventStore,
  ],
})
export class AppModule {}
