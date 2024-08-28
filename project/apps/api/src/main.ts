import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { RequestIdIterceptor } from '@project/interceptors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BlogPostModule } from '@project/blog-post';
import { AuthenticationModule } from '@project/authentication';
import { BlogCommentModule } from '@project/blog-comment';

async function bootstrap() {
  const GLOBAL_PREFIX = 'api';
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
                          .setTitle('Readme app')
                          .setDescription('Readme app API')
                          .setVersion('1.0')
                          .build()

  const document = SwaggerModule.createDocument(app, config, {
    include: [
      BlogPostModule,
      AuthenticationModule,
      BlogCommentModule
    ]
  });
  SwaggerModule.setup('spec', app, document)


  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.useGlobalInterceptors(new RequestIdIterceptor());
  const port = 4000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${GLOBAL_PREFIX}`
  );
}

bootstrap();
