import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { BookingRepository } from '../../repository/booking.repository';
import { Booking } from '../../model/booking.model';
import { GetBookingQuery } from '../get-booking.query';

@QueryHandler(GetBookingQuery)
export class GetBookingHandler
  implements IQueryHandler<GetBookingQuery, Booking | null> {
  constructor(private repository: BookingRepository) {}

  async execute(query: GetBookingQuery): Promise<Booking | null> {
    const { id, time } = query;
    return this.repository.findById(id, time);
  }
}
