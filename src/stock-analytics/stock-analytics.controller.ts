import { AxiosError } from 'axios'
import { catchError, mergeMap } from 'rxjs/operators'
import { ClientProxy } from '@nestjs/microservices'
import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common'
import { Observable, of } from 'rxjs'
import { STOCK_ANALYTICS_SERVICE } from '../common/constants'
import { StockAnalyticsService } from './stock-analytics.service'

@Controller('stocks')
export class StockAnalyticsController {
  constructor(
    @Inject(STOCK_ANALYTICS_SERVICE) private readonly client: ClientProxy,
    private readonly stockAnalyticsService: StockAnalyticsService,
  ) {}

  @Get(':limit')
  fetchTrendingStocks(
    @Param('limit', ParseIntPipe) limit: number,
  ): Observable<Record<string, unknown>[] | never[]> {
    return this.stockAnalyticsService.fetchTrendingStocks(limit).pipe(
      mergeMap((trendingStocks) =>
        this.client.send<Record<string, unknown>[]>(
          { cmd: 'aggregate' },
          trendingStocks,
        ),
      ),
      catchError((error: AxiosError) => {
        console.error(error.message)
        return of([])
      }),
    )
  }
}
