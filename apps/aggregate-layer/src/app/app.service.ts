import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { AggregationalActionDto } from './dto/aggregational-action.dto';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('AGGREGATOR_SERVICE') private readonly _kafkaClient: ClientKafka
  ) {}

  async onModuleInit() {
    this._kafkaClient.subscribeToResponseOf('AUTH_AGGREGATIONAL_DATA');
    this._kafkaClient.subscribeToResponseOf('API_AGGREGATIONAL_DATA');
    await this._kafkaClient.connect();
  }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async getAggregatedData(body: AggregationalActionDto) {
    const userResults = await firstValueFrom(
      this._kafkaClient.send(
        'AUTH_AGGREGATIONAL_DATA',
        body.filters.baseEntityFilters
      )
    );
    const packagesResults = await firstValueFrom(
      this._kafkaClient.send('API_AGGREGATIONAL_DATA', {
        ids: userResults,
        filters: body.filters.finalEntityFilters,
      })
    );
    const result = {
      authData: userResults,
      apiData: packagesResults,
    };
    return result;
  }
}
