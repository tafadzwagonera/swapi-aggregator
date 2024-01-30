import { AxiosError, AxiosResponse } from 'axios'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { Observable, catchError, map } from 'rxjs'

@Injectable()
export class SwapiPeopleService {
  constructor(private readonly httpService: HttpService) {}

  fetchPerson(id: number): Observable<Record<string, unknown>> {
    return this.httpService
      .get<Record<string, unknown>>(`https://swapi.dev/api/people/${id}/`)
      .pipe(
        map(
          ({ data: person }: AxiosResponse<Record<string, unknown>, any>) => ({
            films: person.films,
            name: person.name,
          }),
        ),
        catchError((error: AxiosError) => {
          throw `${error.message}`
        }),
      )
  }
}
