import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { TagRdo } from '@project/blog-tag';

export class PhotoPostRdo {
  @ApiProperty({
    description: 'Path to the image',
    example: 'example.jpg'
  })
  @Expose()
  public path: string;
}
