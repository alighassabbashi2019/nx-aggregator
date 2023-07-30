import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AggregatorBaseService } from './aggregator-base.service';

@Controller()
export class ApiAggregatorRpcController {
  constructor(private readonly _usersService: AggregatorBaseService) {
    console.log(
      'api controller initialized',
      this._usersService.constructor.name
    );
  }

  @MessagePattern('API_AGGREGATIONAL_DATA')
  getAggregatedFromApi(@Payload() payload: string[]) {
    console.log('from api', payload);

    return this._usersService.getApiAggregatedData?.(payload);
  }
}
