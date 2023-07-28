import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserPackages } from '../../user-packages/entity/user-packages.entity';

@Entity()
export class Package {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsNumber()
  price: number;

  @OneToMany(() => UserPackages, (userPackage) => userPackage.package)
  userPackages: UserPackages[];
}
