import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class VideoPostRdo {
  @ApiProperty({
    description: 'Url of the video',
    example: 'https://up.htmlacademy.ru/profession/fullstack/7/nodejs-2'
  })
  @Expose()
  public url: string;
}
