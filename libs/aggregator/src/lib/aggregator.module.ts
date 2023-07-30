import { DynamicModule, Module, Type } from '@nestjs/common';
import { AggregatorBaseService } from './aggregator-base.service';
import { AuthAggregatorRpcController } from './auth.aggregator-rpc.controller';
import { ApiAggregatorRpcController } from './api-aggregator-rpc.controller';

@Module({})
export class AggregatorModule {
  static register(
    service: Type<AggregatorBaseService>,
    Imports: Array<Type | DynamicModule>
  ): DynamicModule {
    console.log('service.name', service.name, ',', typeof service.name);
    console.log(service.name == 'UsersService');
    return {
      module: AggregatorModule,
      imports: [...Imports],
      providers: [
        service,
        {
          provide: AggregatorBaseService,
          useClass: service,
        },
      ],
      controllers: [
        service.name == 'UsersService'
          ? AuthAggregatorRpcController
          : ApiAggregatorRpcController,
      ],
    };
  }
}
