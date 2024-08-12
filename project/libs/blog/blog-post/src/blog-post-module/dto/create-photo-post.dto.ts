import { CreatePostDto } from './create-post.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { $Enums, PostType } from '@prisma/client';

export class CreatePhotoPostDto extends CreatePostDto {
  @ApiProperty({
    description: 'Path to the image',
    example: 'example.jpg'
  })
  @IsString()
  public path: string;

  public type = PostType.PHOTO;
}
