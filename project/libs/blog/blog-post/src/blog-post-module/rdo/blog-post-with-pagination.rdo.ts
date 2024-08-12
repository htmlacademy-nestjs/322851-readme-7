import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BlogPostWithPaginationRdo {
  @ApiProperty({
    description: 'List of items of selected Entity',
    example: ['Post1', 'Post2']
  })
  @Expose()
  public entities: [];

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
