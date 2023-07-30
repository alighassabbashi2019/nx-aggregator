import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AggregatorBaseService } from '@nx-aggregator/aggregator';

@Injectable()
export class UsersService extends AggregatorBaseService {
  constructor(
    @InjectRepository(User) private readonly _userRepo: Repository<User>
  ) {
    super();
  }

  create(createUserDto: CreateUserDto) {
    const createdUser = this._userRepo.create(createUserDto);
    return this._userRepo.save(createdUser);
  }

  async findByFilter(userfilters) {
    // console.log(userfilters, 'sdfsjsjfsdijfsdjf');

    const queryBuilder = this._userRepo.createQueryBuilder('user');
    queryBuilder.where('user.username Like (:name)', {
      name: `%${userfilters.name}%`,
    });
    const users = await queryBuilder.getMany();
    // console.log(users);

    // const users = await this._userRepo.find({
    //   where: { username: Like(`%${userfilters.name}%`) },
    // });
    // console.log('finded users', users);
    return users;
  }

  async getAuthAggregatedData(filters: any): Promise<string[]> {
    const users = await this.findByFilter(filters);
    // console.log('fucking users', users);

    return users.map((user) => user.id);
  }

  findAll(): Promise<User[]> {
    return this._userRepo.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
