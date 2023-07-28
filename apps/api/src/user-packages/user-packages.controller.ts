import { Controller } from '@nestjs/common';
import { UserPackagesService } from './user-packages.service';

@Controller('user-packages')
export class UserPackagesController {
  constructor(private readonly userPackagesService: UserPackagesService) {}
}
