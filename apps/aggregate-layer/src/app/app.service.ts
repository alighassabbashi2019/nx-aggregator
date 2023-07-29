import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { AggregationalActionDto } from './dto/aggregational-action.dto';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('AGGREGATOR_SERVICE') private readonly _kafkaClient: ClientKafka
  ) {}

  onModuleInit() {
    this._kafkaClient.subscribeToResponseOf('AUTH-AGGREGATIONAL_DATA');
  }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  getAggregatedData(body: AggregationalActionDto) {
    this._kafkaClient.send(
      'AUTH-AGGREGATIONAL_DATA',
      body.filters.baseEntityFilters
    );
  }
}
