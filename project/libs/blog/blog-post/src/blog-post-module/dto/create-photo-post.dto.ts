import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePhotoPostDto {
  @ApiProperty({
    description: 'Path to the image',
    example: 'example.jpg'
  })
  @IsString()
  public path: string;
}
