import 'dotenv/config'
import { AppModule } from './app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { NestFactory } from '@nestjs/core'
import env from './config/env.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const port =
    !env.get('PORT') || env.get('PORT') === '0'
      ? 0
      : ((p) => (isNaN(Number(p)) ? 0 : Number(p)))(env.get('PORT') as string)

  app.connectMicroservice<MicroserviceOptions>({
    options: {
      host: env.get('REDIS_HOST') as string,
      port: ((p) => (isNaN(Number(p)) ? 0 : Number(p)))(
        env.get('REDIS_PORT') as string,
      ),
    },
    transport: Transport.REDIS,
  })

  await app.startAllMicroservices()
  await app.listen(port)
}

bootstrap()
