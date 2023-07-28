import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserPackagesService } from './user-packages.service';

@Controller()
export class UserPackagesRpcController {
  constructor(private readonly _userPackageService: UserPackagesService) {}

  @MessagePattern('user.filter.userPackages')
  getAggregated(@Payload() payload: string[]) {
    return this._userPackageService.findByUserIds(payload);
  }
}
