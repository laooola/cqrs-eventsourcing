import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateBookingCommand } from './command/create-booking.command';
import { ChangeBookingStateCommand } from './command/change-booking-state.command';
import { UpdateBookingCommand } from './command/update-booking.command';
import { BookingState, IDateRange } from './common';
import { GetBookingQuery } from './query/get-booking.query';
import { ListBookingEventsQuery } from './query/list-booking-events.query';

@Injectable()
export class AppService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  async getBooking(id: string, time?: Date) {
    return this.queryBus.execute(new GetBookingQuery(id, time));
  }

  async listBookingEvents(id: string) {
    return this.queryBus.execute(new ListBookingEventsQuery(id));
  }

  async createBooking(productId: string, dateRange: IDateRange): Promise<any> {
    return this.commandBus.execute(
      new CreateBookingCommand(productId, dateRange),
    );
  }

  async changeBookingState(id: string, state: BookingState): Promise<any> {
    return this.commandBus.execute(new ChangeBookingStateCommand(id, state));
  }

  async updateBooking(id: string, dateRange: IDateRange): Promise<any> {
    return this.commandBus.execute(new UpdateBookingCommand(id, dateRange));
  }
}
