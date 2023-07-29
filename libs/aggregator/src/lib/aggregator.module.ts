import { DynamicModule, Module, Type } from '@nestjs/common';
import { AggregatorBaseService } from './aggregator-base.service';
import { AggregatorRpcController } from './aggregator-rpc.controller';

@Module({})
export class AggregatorModule {
  static register(
    service: Type<AggregatorBaseService>,
    Imports: Array<Type | DynamicModule>
  ): DynamicModule {
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
      controllers: [AggregatorRpcController],
    };
  }
}
