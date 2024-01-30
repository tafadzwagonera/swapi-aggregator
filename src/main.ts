import 'dotenv/config'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { NestFactory } from '@nestjs/core'
import { SWAGGER_API_BEARER_AUTH_NAME } from './common/constants'
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

  SwaggerModule.setup(
    '/',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .addBearerAuth(undefined, SWAGGER_API_BEARER_AUTH_NAME)
        .addTag('swapi-aggregator')
        .setTitle('SWAPI Aggregator API')
        .build(),
    ),
    {
      swaggerOptions: {
        authAction: {
          defaultBearerAuth: {
            name: SWAGGER_API_BEARER_AUTH_NAME,
            schema: {
              bearerFormat: 'JWT',
              in: 'header',
              scheme: 'bearer',
              type: 'http',
            },
            value: env.get('SWAGGER_API_BEARER_TOKEN'),
          },
        },
      },
    },
  )

  await app.startAllMicroservices()
  await app.listen(port)
}

bootstrap()
