import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use('/public', express.static(join(__dirname, '..', 'public')));
  app.setGlobalPrefix('api');
  await app.enableShutdownHooks();
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
