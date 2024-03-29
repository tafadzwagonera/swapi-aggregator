import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AxiosError } from 'axios'
import { catchError, mergeMap } from 'rxjs/operators'
import { ClientProxy } from '@nestjs/microservices'
import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
} from '@nestjs/common'
import { Observable, of } from 'rxjs'
import { SWAPI_PEOPLE_SERVICE } from '../common/constants'
import { SwapiPeopleService } from './swapi-people.service'

@ApiTags('people')
@Controller('people')
export class SwapiPeopleController {
  constructor(
    @Inject(SWAPI_PEOPLE_SERVICE) private readonly client: ClientProxy,
    private readonly swapiPeopleService: SwapiPeopleService,
  ) {}

  @ApiOperation({ summary: 'Get person.' })
  @ApiResponse({
    description: 'Return person.',
    status: HttpStatus.OK,
  })
  @Get(':id')
  fetchPerson(
    @Param('id', ParseIntPipe) id: number,
  ): Observable<Record<string, unknown> | Record<string, never>> {
    return this.swapiPeopleService.fetchPerson(id).pipe(
      mergeMap((person) =>
        this.client.send<Record<string, unknown>>({ cmd: 'aggregate' }, person),
      ),
      catchError((error: AxiosError) => {
        console.error(error.message)
        return of({})
      }),
    )
  }
}
