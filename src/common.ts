export enum BookingState {
  new = 'new',
  booked = 'booked',
  cancelled = 'cancelled',
}

export interface IDateRange {
  lte: Date;
  gte: Date;
}
