import { BookingState } from '../common';

export class ChangeBookingStateCommand {
  constructor(
    public readonly id: string,
    public readonly state: BookingState,
  ) {}
}
