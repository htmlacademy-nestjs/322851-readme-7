import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class QuotePostRdo {
  @ApiProperty({
    description: 'Author of the quote',
    example: 'Some ginger wildling girl'
  })
  @Expose()
  public author: string;

  @ApiProperty({
    description: 'Text of the post',
    example: 'You know nothing, Jon Snow'
  })
  @Expose()
  public content: string;
}
