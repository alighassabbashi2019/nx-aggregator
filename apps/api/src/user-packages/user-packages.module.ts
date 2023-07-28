import { Module } from '@nestjs/common';
import { UserPackagesService } from './user-packages.service';
import { UserPackagesController } from './user-packages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPackages } from './entity/user-packages.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserPackages])],
  controllers: [UserPackagesController],
  providers: [UserPackagesService],
})
export class UserPackagesModule {}
