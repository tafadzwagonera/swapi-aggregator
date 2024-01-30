import { ClientsModule, Transport } from '@nestjs/microservices'
import { ConfigService, ConfigModule } from '@nestjs/config'
import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { SWAPI_FILMS_SERVICE } from 'src/common/constants'
import { SwapiFilmsController } from './swapi-films.controller'
import { SwapiFilmsService } from './swapi-films.service'

@Module({
  controllers: [SwapiFilmsController],
  exports: [SwapiFilmsService],
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: SWAPI_FILMS_SERVICE,
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
  providers: [SwapiFilmsService],
})
export class SwapiFilmsModule {}
