import { IDateRange } from '../common';

export class GetBookingQuery {
  constructor(public readonly id: string, public readonly time?: Date) {}
}
