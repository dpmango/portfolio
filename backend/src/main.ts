import { NestFactory } from '@nestjs/core'
import { RootModule } from './modules/app.module'
import * as expressListRoutes from 'express-list-routes'

async function bootstrap() {
  const app = await NestFactory.create(RootModule)
  app.setGlobalPrefix('/api')

  app.enableCors()
  await app.listen(8000)

  const server = app.getHttpServer()

  const existingRoutes = server._events.request._router
  expressListRoutes(existingRoutes)
}

bootstrap()
