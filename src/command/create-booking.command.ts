import { IDateRange } from '../common';

export class CreateBookingCommand {
  constructor(
    public readonly productId: string,
    public readonly dateRange: IDateRange,
  ) {}
}
