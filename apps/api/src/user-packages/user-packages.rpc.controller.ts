import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UserPackagesRpcController {
  @EventPattern('userfilteruserPackages')
  getAggregated(@Payload() payload: number[]) {
    console.log('reatch here');
    console.log(payload);
    return 'ali';
  }
}
