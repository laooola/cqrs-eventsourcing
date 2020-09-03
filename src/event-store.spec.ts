import { Test } from '@nestjs/testing';

import { BookingState } from './common';
import { BookingCreatedEvent } from './event/booking-created.event';
import { StorableEvent } from './event/storable-event';
import { EventStore } from './event-store';

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

describe('EventStore', () => {
  let eventStore: EventStore;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [{ provide: 'EVENT_DATA', useValue: data }, EventStore],
    }).compile();

    eventStore = moduleRef.get<EventStore>(EventStore);
  });

  describe('getStreamEvents', () => {
    it('returns the stream events (position: 0, batchSize: 1000)', async () => {
      const events = await eventStore.getStreamEvents('booking-1', 0, 1000);
      expect(events.map(e => e.id)).toEqual([
        '623cfc2f-f01c-4f80-8403-4efb90e9cfb0',
        '78cf9ca8-a7d2-41d2-b449-3a3eeb7dd1da',
        '8498540f-7967-4a80-a45e-f443a4bf65e8',
        '23f7118c-497d-4f30-b122-b02aec33f7b6',
      ]);
    });

    it('returns the stream events (position: 0, batchSize: 1)', async () => {
      const events = await eventStore.getStreamEvents('booking-1', 0, 1);
      expect(events.map(e => e.id)).toEqual([
        '623cfc2f-f01c-4f80-8403-4efb90e9cfb0',
      ]);
    });

    it('returns the stream events (position: 2, batchSize: 2)', async () => {
      const events = await eventStore.getStreamEvents('booking-1', 2, 2);
      expect(events.map(e => e.id)).toEqual([
        '8498540f-7967-4a80-a45e-f443a4bf65e8',
        '23f7118c-497d-4f30-b122-b02aec33f7b6',
      ]);
    });

    it('returns the stream events (position: 0, batchSize: 1000, time: "2020-09-01T14:08:11.105Z")', async () => {
      const events = await eventStore.getStreamEvents(
        'booking-1',
        0,
        1000,
        new Date('2020-09-01T14:08:11.105Z'),
      );
      expect(events.map(e => e.id)).toEqual([
        '623cfc2f-f01c-4f80-8403-4efb90e9cfb0',
        '78cf9ca8-a7d2-41d2-b449-3a3eeb7dd1da',
        '8498540f-7967-4a80-a45e-f443a4bf65e8',
      ]);
    });

    it('returns proper event instances', async () => {
      const events = await eventStore.getStreamEvents('booking-1', 0, 1);
      expect(events[0]).toBeInstanceOf(BookingCreatedEvent);
    });
  });

  describe('store', () => {
    it('stores an event', async () => {
      const event = new BookingCreatedEvent('booking-2', {
        id: '2',
        state: BookingState.new,
        productId: '2',
        dateRange: {
          gte: new Date('2020-09-01T00:00:00.000Z'),
          lte: new Date('2020-10-01T00:00:00.000Z'),
        },
      });
      await eventStore.store(event);
      expect(data[data.length - 1]).toEqual({
        id: expect.any(String),
        stream_name: 'booking-2',
        type: 'BookingCreatedEvent',
        data: {
          id: '2',
          state: BookingState.new,
          productId: '2',
          dateRange: {
            gte: new Date('2020-09-01T00:00:00.000Z'),
            lte: new Date('2020-10-01T00:00:00.000Z'),
          },
        },
        time: expect.any(String),
      });
    });
  });
});
