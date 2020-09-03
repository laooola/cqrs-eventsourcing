import { IDateRange } from '../common';

export class UpdateBookingCommand {
  constructor(
    public readonly id: string,
    public readonly dateRange: IDateRange,
  ) {}
}
