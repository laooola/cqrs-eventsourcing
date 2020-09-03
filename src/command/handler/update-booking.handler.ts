import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { EventSourcingPublisher } from '../../event-sourcing-publisher';
import { BookingRepository } from '../../repository/booking.repository';
import { UpdateBookingCommand } from '../update-booking.command';

@CommandHandler(UpdateBookingCommand)
export class UpdateBookingHandler
  implements ICommandHandler<UpdateBookingCommand> {
  constructor(
    private repository: BookingRepository,
    private publisher: EventSourcingPublisher,
  ) {}

  async execute(command: UpdateBookingCommand) {
    const { id, dateRange } = command;
    const booking = this.publisher.mergeObjectContext(
      await this.repository.findById(id),
    );
    booking.update(dateRange);
    booking.commit();
  }
}
