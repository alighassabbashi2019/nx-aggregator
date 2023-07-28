import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @Inject('USER_SERVICE') private readonly _kafkaClient: ClientKafka
  ) {}

  onModuleInit() {
    this._kafkaClient.subscribeToResponseOf('user.filter.userPackages');
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  getAggregatedData() {
    console.log('from aggregate method');

    this._kafkaClient.emit('userfilteruserPackages', [1, 2, 3]);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
