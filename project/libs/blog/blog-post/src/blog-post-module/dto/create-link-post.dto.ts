import { CreatePostDto } from './create-post.dto';
import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BlogPostValidateMessage } from '../blog-post.consts';
import { PostType } from '@prisma/client';

export class CreateLinkPostDto extends CreatePostDto {
  @ApiProperty({
    description: 'Url of the link',
    example: 'https://up.htmlacademy.ru/profession/fullstack/7/nodejs-2'
  })
  @IsUrl({}, {message: BlogPostValidateMessage.InvalidUrl})
  public url: string;

  @ApiProperty({
    description: 'Description of the link',
    example: 'This is wonderful course from HtmlAcademy'
  })
  @IsOptional()
  @IsString()
  @MaxLength(300, {message: BlogPostValidateMessage.InvalidLinkDescription})
  public description?: string;

  public type = PostType.LINK;
}
