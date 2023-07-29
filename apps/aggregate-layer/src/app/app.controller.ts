import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { AggregationalActionDto } from './dto/aggregational-action.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('/aggregate-and-action')
  getAggregatedData(@Body() body: AggregationalActionDto) {
    return this.appService.getAggregatedData(body);
  }
}
