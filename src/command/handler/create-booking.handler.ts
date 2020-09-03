import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { EventSourcingPublisher } from '../../event-sourcing-publisher';
import { Booking } from '../../model/booking.model';
import { CreateBookingCommand } from '../create-booking.command';

@CommandHandler(CreateBookingCommand)
export class CreateBookingHandler
  implements ICommandHandler<CreateBookingCommand> {
  constructor(private publisher: EventSourcingPublisher) {}

  async execute(command: CreateBookingCommand) {
    const { productId, dateRange } = command;
    const booking = this.publisher.mergeObjectContext(new Booking());
    booking.create(productId, dateRange);
    booking.commit();
  }
}
