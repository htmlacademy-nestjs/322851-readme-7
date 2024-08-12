import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdatePostDto } from './update-post.dto';

export class UpdatePhotoPostDto extends UpdatePostDto {
  @ApiProperty({
    description: 'Path to the image',
    example: 'example.jpg'
  })
  @IsOptional()
  @IsString()
  path: string;
}
