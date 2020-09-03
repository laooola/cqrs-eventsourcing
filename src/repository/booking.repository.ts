import { Injectable } from '@nestjs/common';

import { EventStore } from '../event-store';
import { Booking } from '../model/booking.model';

@Injectable()
export class BookingRepository {
  constructor(private readonly eventStore: EventStore) {}

  async findById(id: string, time?: Date): Promise<Booking | null> {
    const events = await this.eventStore.getStreamEvents(
      `booking-${id}`,
      0,
      1000,
      time,
    );
    if (!events || !events.length) {
      return null;
    }
    const booking = new Booking();
    booking.loadFromHistory(events);
    return booking;
  }
}
