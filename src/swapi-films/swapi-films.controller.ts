import { AxiosError } from 'axios'
import { Controller, Get, Param } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { Observable, catchError, forkJoin, map, mergeMap, of } from 'rxjs'
import { SwapiFilmsService } from './swapi-films.service'

@Controller('films')
export class SwapiFilmsController {
  constructor(private readonly swapiFilmsService: SwapiFilmsService) {}

  @MessagePattern({ cmd: 'aggregate' })
  aggregate(
    person: Record<string, unknown>,
  ): Observable<Record<string, unknown>> {
    return of(person).pipe(
      mergeMap((person: Record<string, unknown>) => {
        const urls = (person.films as string[]) || []
        const re = /\//
        const ids = urls.map((url) => Number(url.split(re).slice(-2).at(0)))

        return forkJoin(
          ids.map((id) => this.swapiFilmsService.fetchFilm(id)),
        ).pipe(
          map((films: Record<string, unknown>[]) => {
            return {
              ...person,
              films,
            }
          }),
        )
      }),
    )
  }

  @Get(':id')
  fetchFilm(
    @Param('id') id: number,
  ): Observable<Record<string, unknown> | Record<string, never>> {
    return this.swapiFilmsService.fetchFilm(id).pipe(
      catchError((error: AxiosError) => {
        console.error(error.message)
        return of({})
      }),
    )
  }
}
