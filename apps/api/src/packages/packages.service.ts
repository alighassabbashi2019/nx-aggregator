import { Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/package.dto';
import { UpdatePackageDto } from './dto/package.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Package } from './entities/package.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Package)
    private readonly _packageRepo: Repository<Package>
  ) {}

  create(createPackageDto: CreatePackageDto) {
    const createdPackage = this._packageRepo.create(createPackageDto);
    return this._packageRepo.save(createdPackage);
  }

  findAll() {
    return `This action returns all packages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} package`;
  }

  update(id: number, updatePackageDto: UpdatePackageDto) {
    return `This action updates a #${id} package`;
  }

  remove(id: number) {
    return `This action removes a #${id} package`;
  }
}
