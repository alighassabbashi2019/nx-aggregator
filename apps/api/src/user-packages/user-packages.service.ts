import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPackages } from './entity/user-packages.entity';
import { Repository } from 'typeorm';
import { AssignDto } from './dto/user-package.dto';
import { AggregatorBaseService } from '@nx-aggregator/aggregator';

@Injectable()
export class UserPackagesService extends AggregatorBaseService {
  constructor(
    @InjectRepository(UserPackages)
    private readonly _userPackagesRepo: Repository<UserPackages>
  ) {
    super();
  }

  assign(assignDto: AssignDto) {
    const createNewAssignment = this._userPackagesRepo.create(assignDto);
    return this._userPackagesRepo.save(createNewAssignment);
  }

  async getApiAggregatedData(filters: any): Promise<string[]> {
    console.log(filters);

    const queryBuilder = this._userPackagesRepo
      .createQueryBuilder('userPackages')
      .leftJoinAndSelect('userPackages.package', 'package')
      .where('userPackages.userId IN (:...ids)', { ids: filters.ids })
      .andWhere('package.id = :id', {
        id: filters.filters.package,
      });
    const userPackages = await queryBuilder.getMany();
    console.log(userPackages);

    return userPackages.map((userPackage) => userPackage.userId);
  }

  async findByUserIds(payload) {
    const queryBuilder = this._userPackagesRepo
      .createQueryBuilder('userPackages')
      .leftJoinAndSelect('userPackages.package', 'package')
      .where('userPackages.userId IN (:...ids)', { ids: payload.ids })
      .andWhere('package.id = :id', { id: JSON.parse(payload.filter).package });
    const userPackages = await queryBuilder.getMany();
    console.log(userPackages);

    return userPackages.map((userPackage) => userPackage.userId);
  }
}
