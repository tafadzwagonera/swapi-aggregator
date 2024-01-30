import { Controller, Get, Param } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { Observable, catchError, of } from 'rxjs'
import { StockPricesService } from './stock-prices.service'
import { AxiosError } from 'axios'

@Controller('prices')
export class StockPricesController {
  constructor(private readonly stockPricesService: StockPricesService) {}

  @MessagePattern({ cmd: 'aggregate' })
  aggregate(
    data: Observable<Record<string, unknown>>[],
  ): Observable<Record<string, unknown>[]> {
    return new Observable<Record<string, unknown>[]>((observer: any) => {
      observer.next(data)
      observer.complete()
    })
  }

  @Get(':ticker')
  fetchStockPrice(
    @Param('ticker') ticker: string,
  ): Observable<Record<string, unknown> | Record<string, never>> {
    return this.stockPricesService.fetchStockPrice(ticker).pipe(
      catchError((error: AxiosError) => {
        console.error(error.message)
        return of({})
      }),
    )
  }
}
