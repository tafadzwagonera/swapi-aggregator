import { AxiosError, AxiosResponse } from 'axios'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { Observable, catchError, map } from 'rxjs'

@Injectable()
export class SwapiFilmsService {
  constructor(private readonly httpService: HttpService) {}

  fetchFilm(id: number): Observable<Record<string, unknown>> {
    return this.httpService
      .get<Record<string, unknown>>(`https://swapi.dev/api/films/${id}/`)
      .pipe(
        map(({ data: film }: AxiosResponse<Record<string, unknown>, any>) => ({
          director: film.director,
          releaseDate: film.release_date,
          title: film.title,
        })),
        catchError((error: AxiosError) => {
          throw `${error.message}`
        }),
      )
  }
}
