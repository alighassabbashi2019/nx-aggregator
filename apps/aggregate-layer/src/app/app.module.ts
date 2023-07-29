import { Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AGGREGATOR_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'aggregator',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'aggregator-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
