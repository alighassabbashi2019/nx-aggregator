import { Body, Controller, Post } from '@nestjs/common';
import { UserPackagesService } from './user-packages.service';
import { AssignDto } from './dto/user-package.dto';

@Controller('user-packages')
export class UserPackagesController {
  constructor(private readonly _userPackagesService: UserPackagesService) {}

  @Post()
  assignPackageToUser(@Body() assingDto: AssignDto) {
    return this._userPackagesService.assign(assingDto);
  }
}
