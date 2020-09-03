import { BookingState } from '../common';
import { StorableEvent } from './storable-event';

interface IBookingStateChangedEventData {
  state: BookingState;
}

export class BookingStateChangedEvent extends StorableEvent<
  IBookingStateChangedEventData,
  any
> {
  constructor(
    streamName: string,
    data: IBookingStateChangedEventData,
    meta?: any,
  ) {
    super(streamName, data, meta);
  }
}
