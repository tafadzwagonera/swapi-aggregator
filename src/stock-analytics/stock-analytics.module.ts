import { ClientsModule, Transport } from '@nestjs/microservices'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { STOCK_ANALYTICS_SERVICE } from '../common/constants'
import { StockAnalyticsController } from './stock-analytics.controller'
import { StockAnalyticsService } from './stock-analytics.service'
@Module({
  controllers: [StockAnalyticsController],
  exports: [StockAnalyticsService],
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: STOCK_ANALYTICS_SERVICE,
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
  providers: [StockAnalyticsService],
})
export class StockAnalyticsModule {}
