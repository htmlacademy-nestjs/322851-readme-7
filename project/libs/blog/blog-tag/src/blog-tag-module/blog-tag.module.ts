import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@project/blog-models';
import { BlogTagFactory } from './blog-tag.factory';
import { BlogTagService } from './blog-tag.service';
import { BlogTagRepository } from './blog-tag.repository';

@Module({
  providers: [BlogTagFactory, BlogTagService, BlogTagRepository],
  exports: [BlogTagService],
  imports: [PrismaClientModule]
})
export class BlogTagModule {};
