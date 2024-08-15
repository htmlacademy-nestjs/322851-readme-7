import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BlogPostValidateMessage } from '../blog-post.consts';

export class UpdateLinkPostDto {
  @ApiProperty({
    description: 'Url of the link',
    example: 'https://up.htmlacademy.ru/profession/fullstack/7/nodejs-2'
  })
  @IsOptional()
  @IsUrl({}, {message: BlogPostValidateMessage.InvalidUrl})
  url?: string;

  @ApiProperty({
    description: 'Description of the link',
    example: 'This is wonderful course from HtmlAcademy'
  })
  @IsOptional()
  @IsString()
  @MaxLength(300, {message: BlogPostValidateMessage.InvalidLinkDescription})
  description?: string;
}
