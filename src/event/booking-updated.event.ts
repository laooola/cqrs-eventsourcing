import { IDateRange } from '../common';
import { StorableEvent } from './storable-event';

interface IBookingUpdatedEventData {
  dateRange: IDateRange;
}

export class BookingUpdatedEvent extends StorableEvent<
  IBookingUpdatedEventData,
  any
> {
  constructor(streamName: string, data: IBookingUpdatedEventData, meta?: any) {
    super(streamName, data, meta);
  }
}
