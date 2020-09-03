import { BookingState, IDateRange } from '../common';
import { StorableEvent } from './storable-event';

interface IBookingCreatedEventData {
  id: string;
  state: BookingState;
  productId: string;
  dateRange: IDateRange;
}

export class BookingCreatedEvent extends StorableEvent<
  IBookingCreatedEventData,
  any
> {
  constructor(streamName: string, data: IBookingCreatedEventData, meta?: any) {
    super(streamName, data, meta);
  }
}
