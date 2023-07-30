import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AggregatorBaseService } from './aggregator-base.service';

@Controller()
export class AuthAggregatorRpcController {
  constructor(private readonly _usersService: AggregatorBaseService) {
    console.log(
      'auth controller initialized',
      this._usersService.constructor.name
    );
  }

  @MessagePattern('AUTH_AGGREGATIONAL_DATA')
  getAggregatedFromAuth(@Payload() payload: string[]) {
    console.log('from auth', payload);
    return this._usersService?.getAuthAggregatedData?.(payload);
  }
}
