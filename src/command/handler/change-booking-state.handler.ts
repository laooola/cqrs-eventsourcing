import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { EventSourcingPublisher } from '../../event-sourcing-publisher';
import { BookingRepository } from '../../repository/booking.repository';
import { ChangeBookingStateCommand } from '../change-booking-state.command';

@CommandHandler(ChangeBookingStateCommand)
export class ChangeBookingStateHandler
  implements ICommandHandler<ChangeBookingStateCommand> {
  constructor(
    private repository: BookingRepository,
    private publisher: EventSourcingPublisher,
  ) {}

  async execute(command: ChangeBookingStateCommand) {
    const { id, state } = command;
    const booking = this.publisher.mergeObjectContext(
      await this.repository.findById(id),
    );
    booking.changeState(state);
    booking.commit();
  }
}
