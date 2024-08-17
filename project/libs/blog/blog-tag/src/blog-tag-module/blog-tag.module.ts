import { Module } from '@nestjs/common';
import { BlogTagFactory } from './blog-tag.factory';
import { BlogTagService } from './blog-tag.service';
import { BlogTagRepository } from './blog-tag.repository';
import { PrismaClientModule } from '@project/blog-models';

@Module({
  imports: [PrismaClientModule],
  providers: [BlogTagFactory, BlogTagService, BlogTagRepository],
  exports: [BlogTagService]
})
export class BlogTagModule {};
