import { AggregateRoot } from '@nestjs/cqrs';
import * as uuid from 'uuid';

import { BookingState, IDateRange } from '../common';
import { BookingCreatedEvent } from '../event/booking-created.event';
import { BookingStateChangedEvent } from '../event/booking-state-changed.event';
import { BookingUpdatedEvent } from '../event/booking-updated.event';

export class Booking extends AggregateRoot {
  id: string;
  state: BookingState;
  productId: string;
  dateRange: IDateRange;

  private getStreamName(): string {
    return `booking-${this.id}`;
  }

  create(productId: string, dateRange: IDateRange): void {
    // create booking logic
    this.id = uuid.v4();
    this.apply(
      new BookingCreatedEvent(this.getStreamName(), {
        id: this.id,
        state: BookingState.new,
        productId,
        dateRange,
      }),
    );
  }

  update(dateRange: IDateRange) {
    // update booking logic
    this.apply(new BookingUpdatedEvent(this.getStreamName(), { dateRange }));
  }

  changeState(state: BookingState) {
    // change booking state logic
    this.apply(new BookingStateChangedEvent(this.getStreamName(), { state }));
  }

  onBookingCreatedEvent(event: BookingCreatedEvent): void {
    const { data } = event;
    this.id = data.id;
    this.state = data.state;
    this.productId = data.productId;
    this.dateRange = data.dateRange;
  }

  onBookingUpdatedEvent(event: BookingUpdatedEvent): void {
    const { data } = event;
    this.dateRange = data.dateRange;
  }

  onBookingStateChangedEvent(event: BookingStateChangedEvent): void {
    const { data } = event;
    this.state = data.state;
  }
}
