import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LinkPostRdo {
  @ApiProperty({
    description: 'Url of the link',
    example: 'https://up.htmlacademy.ru/profession/fullstack/7/nodejs-2'
  })
  @Expose()
  public url: string;

  @ApiProperty({
    description: 'Description of the link',
    example: 'This is wonderful course from HtmlAcademy'
  })
  @Expose()
  public description?: string;
}
