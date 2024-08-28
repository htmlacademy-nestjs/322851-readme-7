import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const GLOBAL_PREFIX = 'api';
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
                      .setTitle('The "Account service"')
                      .setDescription('Account service API')
                      .setVersion('1.0')
                      .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    exceptionFactory: (errors: ValidationError[]) => errors.toString()
  }));


  app.setGlobalPrefix(GLOBAL_PREFIX);

  const configService = app.get(ConfigService);
  const port = configService.get('application.port');
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${GLOBAL_PREFIX}`
  );
}

bootstrap();
