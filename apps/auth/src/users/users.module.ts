import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AggregatorModule } from '@nx-aggregator/aggregator';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AggregatorModule.register(UsersService, [TypeOrmModule.forFeature([User])]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
