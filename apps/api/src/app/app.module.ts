import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackagesModule } from '../packages/packages.module';
import { UserPackagesModule } from '../user-packages/user-packages.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'api.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PackagesModule,
    UserPackagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
