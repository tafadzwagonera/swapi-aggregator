import { ClientsModule, Transport } from '@nestjs/microservices'
import { ConfigService, ConfigModule } from '@nestjs/config'
import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { STOCK_PRICES_SERVICE } from 'src/common/constants'
import { StockPricesController } from './stock-prices.controller'
import { StockPricesService } from './stock-prices.service'

@Module({
  controllers: [StockPricesController],
  exports: [StockPricesService],
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: STOCK_PRICES_SERVICE,
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
  providers: [StockPricesService],
})
export class StockPricesModule {}
