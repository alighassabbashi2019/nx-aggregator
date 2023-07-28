import { OmitType, PartialType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class CreateUserDto extends OmitType(User, ['id']) {}
export class UpdateUserDto extends PartialType(CreateUserDto) {}
