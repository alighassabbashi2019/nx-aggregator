import { Module } from '@nestjs/common';
import { UserPackagesService } from './user-packages.service';
import { UserPackagesController } from './user-packages.controller';

@Module({
  controllers: [UserPackagesController],
  providers: [UserPackagesService],
})
export class UserPackagesModule {}
