import { AxiosError, AxiosResponse } from 'axios'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { Observable, catchError, map } from 'rxjs'

@Injectable()
export class StockAnalyticsService {
  constructor(private readonly httpService: HttpService) {}

  fetchTrendingStocks(limit: number): Observable<Record<string, unknown>[]> {
    return this.httpService
      .get<Record<string, unknown>[]>(
        'https://last10k-company-v1.p.rapidapi.com/v1/app/analytics',
        {
          headers: {
            'X-RapidAPI-Key':
              '0c26ce2a7dmsh609a4879b177e17p12bdd4jsnc9e46c0a4e3b',
            'X-RapidAPI-Host': 'last10k-company-v1.p.rapidapi.com',
          },
        },
      )
      .pipe(
        map(
          ({
            data: trendingStocks,
          }: AxiosResponse<Record<string, unknown>[], any>) => {
            console.info(limit, trendingStocks)

            return limit ? trendingStocks.slice(0, limit) : trendingStocks
          },
        ),
        catchError((error: AxiosError) => {
          throw `${error.message}`
        }),
      )
  }
}
