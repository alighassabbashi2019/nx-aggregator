import { OmitType } from '@nestjs/mapped-types';
import { UserPackages } from '../entity/user-packages.entity';

export class AssignDto extends OmitType(UserPackages, ['id']) {}
