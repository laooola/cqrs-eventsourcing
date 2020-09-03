import { Controller, Get, Param, Query } from '@nestjs/common';

import { AppService } from './app.service';
import { BookingState, IDateRange } from './common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/booking/:id')
  async getBooking(@Param() params, @Query() query): Promise<string> {
    let time;
    if (query.time) {
      time = new Date(query.time);
      if (isNaN(time.getTime())) {
        return `Invalid time: ${query.time}`;
      }
    }
    try {
      return await this.appService.getBooking(params.id, time);
    } catch (err) {
      console.log(err);
      return 'An error occurred';
    }
  }

  @Get('/booking/:id/events')
  async listBookingEvents(@Param() params): Promise<string> {
    try {
      return await this.appService.listBookingEvents(params.id);
    } catch (err) {
      console.log(err);
      return 'An error occurred';
    }
  }

  @Get('/booking/create/:productId/:dateRange')
  async createBooking(@Param() params): Promise<string> {
    const [gte, lte] = params.dateRange.split(';');
    const dateRange = {
      gte: new Date(gte || ''),
      lte: new Date(lte || ''),
    };
    if (isNaN(dateRange.gte.getTime()) || isNaN(dateRange.lte.getTime())) {
      return `Invalid date range: ${params.dateRange}`;
    }
    try {
      await this.appService.createBooking(params.productId, dateRange);
      return 'Done';
    } catch (err) {
      console.log(err);
      return 'An error occurred';
    }
  }

  @Get('/booking/:id/state/:state')
  async changeBookingState(@Param() params): Promise<string> {
    const state = BookingState[params.state];
    if (!state) {
      return `Invalid booking state: ${params.state}`;
    }
    try {
      await this.appService.changeBookingState(params.id, state);
      return 'Done';
    } catch (err) {
      console.log(err);
      return 'An error occurred';
    }
  }

  @Get('/booking/:id/daterange/:dateRange')
  async updateBooking(@Param() params): Promise<string> {
    const [gte, lte] = params.dateRange.split(';');
    const dateRange = {
      gte: new Date(gte || ''),
      lte: new Date(lte || ''),
    };
    if (isNaN(dateRange.gte.getTime()) || isNaN(dateRange.lte.getTime())) {
      return `Invalid date range: ${params.dateRange}`;
    }
    try {
      await this.appService.updateBooking(params.id, dateRange);
      return 'Done';
    } catch (err) {
      console.log(err);
      return 'An error occurred';
    }
  }
}
