import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPackages } from './entity/user-packages.entity';
import { In, Repository } from 'typeorm';
import { AssignDto } from './dto/user-package.dto';

@Injectable()
export class UserPackagesService {
  constructor(
    @InjectRepository(UserPackages)
    private readonly _userPackagesRepo: Repository<UserPackages>
  ) {}

  assign(assignDto: AssignDto) {
    const createNewAssignment = this._userPackagesRepo.create(assignDto);
    return this._userPackagesRepo.save(createNewAssignment);
  }

  async findByUserIds(payload) {
    console.log(JSON.parse(payload.filter).package, payload.ids);

    const queryBuilder = this._userPackagesRepo
      .createQueryBuilder('userPackages')
      .leftJoinAndSelect('userPackages.package', 'package')
      .where('userPackages.userId IN (:...ids)', { ids: payload.ids })
      .andWhere('package.id = :id', { id: JSON.parse(payload.filter).package });
    const userPackages = await queryBuilder.getMany();
    return userPackages.map((userPackage) => userPackage.userId);
  }
}
