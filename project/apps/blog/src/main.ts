import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const GLOBAL_PREFIX = 'api';
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
                      .setTitle('The "Blog service"')
                      .setDescription('Blog service API')
                      .setVersion('1.0')
                      .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);


  app.setGlobalPrefix(GLOBAL_PREFIX);

  app.useGlobalPipes(new ValidationPipe({transform: true, stopAtFirstError: false}));

  const port = process.env.PORT || 3334;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${GLOBAL_PREFIX}`
  );
}

bootstrap();
