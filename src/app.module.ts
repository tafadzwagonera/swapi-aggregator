import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { StockAnalyticsModule } from './stock-analytics/stock-analytics.module'
import { StockPricesModule } from './stock-prices/stock-prices.module'

@Module({
  controllers: [AppController],
  imports: [StockAnalyticsModule, StockPricesModule],
  providers: [AppService],
})
export class AppModule {}
