import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { BlogPostRdo } from './blog-post.rdo';

export class BlogPostWithPaginationRdo {
  @ApiProperty({
    description: 'List of items of selected Entity',
    example: ['Post1', 'Post2']
  })
  @Expose()
  @Type(() => BlogPostRdo)
  public entities: BlogPostRdo[];

  @ApiProperty({
    description: 'Total page count of selected entity',
    example: 10
  })
  @Expose()
  public totalPages: number;

  @ApiProperty({
    description: 'Current page number',
    example: 2
  })
  @Expose()
  public currentPage: number;

  @ApiProperty({
    description: 'Total items count of selected entity',
    example: 50
  })
  @Expose()
  public totalItems: number;

  @ApiProperty({
    description: 'Number of items on one page',
    example: 20
  })
  @Expose()
  public itemsPerPage: number;
}
