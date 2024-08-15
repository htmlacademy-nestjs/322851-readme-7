import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TextPostRdo {
  @ApiProperty({
    description: 'Text of the post',
    example: 'You know nothing, Jon Snow'
  })
  @Expose()
  public content: string;

  @ApiProperty({
    description: 'Title of the post',
    example: 'Tset title'
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Short description of the post',
    example: 'This post is about test'
  })
  @Expose()
  public preview: string;
}
