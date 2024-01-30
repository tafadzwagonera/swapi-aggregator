import { AxiosError, AxiosResponse } from 'axios'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { Observable, catchError, map } from 'rxjs'

@Injectable()
export class StockPricesService {
  constructor(private readonly httpService: HttpService) {}

  fetchStockPrice(ticker: string): Observable<Record<string, unknown>> {
    return this.httpService
      .get<Record<string, unknown>>(
        `https://stock-price4.p.rapidapi.com/price/${ticker}`,
        {
          headers: {
            'X-RapidAPI-Key':
              '0c26ce2a7dmsh609a4879b177e17p12bdd4jsnc9e46c0a4e3b',
            'X-RapidAPI-Host': 'stock-price4.p.rapidapi.com',
          },
        },
      )
      .pipe(
        map(
          ({ data: stockPrice }: AxiosResponse<Record<string, unknown>, any>) =>
            stockPrice,
        ),
        catchError((error: AxiosError) => {
          throw `${error.message}`
        }),
      )
  }
}
