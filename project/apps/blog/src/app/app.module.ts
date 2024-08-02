import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogTagModule } from '@project/blog-tag';

@Module({
  imports: [BlogTagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
