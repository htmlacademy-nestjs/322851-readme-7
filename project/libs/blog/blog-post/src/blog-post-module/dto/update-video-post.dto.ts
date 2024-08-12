import { IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BlogPostValidateMessage } from '../blog-post.consts';
import { UpdatePostDto } from './update-post.dto';

export class UpdateVideoPostDto extends UpdatePostDto {
  @ApiProperty({
    description: 'Url of youtube video',
    example: 'https://www.youtube.com/watch?v=aY1E8jegel8'
  })
  @IsOptional()
  @IsUrl({}, {message: BlogPostValidateMessage.InvalidUrl})
  url: string;
}
