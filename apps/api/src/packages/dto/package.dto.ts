import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Package } from '../entities/package.entity';

export class CreatePackageDto extends OmitType(Package, ['id']) {}
export class UpdatePackageDto extends PartialType(CreatePackageDto) {}
