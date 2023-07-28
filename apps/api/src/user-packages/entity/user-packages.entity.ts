import { IsUUID } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserPackages {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsUUID()
  userId: string;

  @Column()
  @IsUUID()
  packageId: string;

  @CreateDateColumn()
  createdAt: Date;
}
