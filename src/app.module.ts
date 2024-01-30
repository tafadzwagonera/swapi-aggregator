import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SwapiPeopleModule } from './swapi-people/swapi-people.module'
import { SwapiFilmsModule } from './swapi-films/swapi-films.module'

@Module({
  controllers: [AppController],
  imports: [SwapiPeopleModule, SwapiFilmsModule],
  providers: [AppService],
})
export class AppModule {}
