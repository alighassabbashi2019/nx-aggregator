import { IsUUID } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Package } from '../../packages/entities/package.entity';

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

  @ManyToOne(() => Package, (pack) => pack.userPackages)
  package: Package;
}
