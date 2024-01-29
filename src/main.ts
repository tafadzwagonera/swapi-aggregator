import { AppModule } from './app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { NestFactory } from '@nestjs/core'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.connectMicroservice<MicroserviceOptions>({
    options: {
      host: '127.0.0.1',
      port: 6379,
    },
    transport: Transport.REDIS,
  })

  await app.startAllMicroservices()

  await app.listen(3000)
}

bootstrap()
