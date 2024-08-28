import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ApplicationSetting } from './app.config';
import { UsersController } from './users.controller';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { BlogController } from './blog.controller';
import { CommentController } from './comments.controller';

@Module({
  imports: [
    HttpModule.register({
      maxRedirects: ApplicationSetting.HTTP_CLIENT_MAX_REDIRECTS,
      timeout: ApplicationSetting.HTTP_CLIENT_TIMEOUT
    })
  ],
  controllers: [
    UsersController,
    BlogController,
    CommentController
  ],
  providers: [CheckAuthGuard],
})
export class AppModule {}
