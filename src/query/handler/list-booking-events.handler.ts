import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { EventStore } from '../../event-store';
import { ListBookingEventsQuery } from '../list-booking-events.query';

@QueryHandler(ListBookingEventsQuery)
export class ListBookingEventsHandler
  implements IQueryHandler<ListBookingEventsQuery, any> {
  constructor(private readonly eventStore: EventStore) {}

  async execute(query: ListBookingEventsQuery): Promise<any> {
    const { id } = query;
    return this.eventStore.getStreamEvents(`booking-${id}`, 0, 1000);
  }
}
