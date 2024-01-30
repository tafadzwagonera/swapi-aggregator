import { ClientsModule, Transport } from '@nestjs/microservices'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { SWAPI_PEOPLE_SERVICE } from '../common/constants'
import { SwapiPeopleController } from './swapi-people.controller'
import { SwapiPeopleService } from './swapi-people.service'

@Module({
  controllers: [SwapiPeopleController],
  exports: [SwapiPeopleService],
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: SWAPI_PEOPLE_SERVICE,
        useFactory: async (configService: ConfigService) => ({
          options: {
            host: configService.get<string>('REDIS_HOST'),
            port: configService.get<number>('REDIS_PORT'),
          },
          transport: Transport.REDIS,
        }),
      },
    ]),
    HttpModule,
  ],
  providers: [SwapiPeopleService],
})
export class SwapiPeopleModule {}
