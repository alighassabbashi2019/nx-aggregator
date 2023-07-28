import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/user.dto';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @Inject('USER_SERVICE') private readonly _kafkaClient: ClientKafka,
    @InjectRepository(User) private readonly _userRepo: Repository<User>
  ) {}

  onModuleInit() {
    this._kafkaClient.subscribeToResponseOf('user.filter.userPackages');
  }

  create(createUserDto: CreateUserDto) {
    const createdUser = this._userRepo.create(createUserDto);
    return this._userRepo.save(createdUser);
  }

  async getAggregatedData(userFilters, packageFilters) {
    const users = await this.findByFilter(JSON.parse(userFilters));
    const userIds = users.map((user) => user.id);
    return lastValueFrom(
      this._kafkaClient.send('user.filter.userPackages', {
        ids: userIds,
        filter: packageFilters,
      })
    );
  }

  async findByFilter(userfilters) {
    const queryBuilder = this._userRepo.createQueryBuilder('user');
    queryBuilder.where('user.username LIKE :name', {
      name: `%${userfilters.name}%`,
    });
    return await queryBuilder.getMany();
  }

  findAll(): Promise<User[]> {
    return this._userRepo.find();
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
