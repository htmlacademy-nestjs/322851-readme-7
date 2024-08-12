import { IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BlogPostValidateMessage } from '../blog-post.consts';
import { UpdatePostDto } from './update-post.dto';

export class UpdateQuotePostDto extends UpdatePostDto {
  @ApiProperty({
    description: 'Text of the quote',
    example: 'You know nothing, Jon Snow'
  })
  @IsString()
  @IsOptional()
  @Length(20, 300, {message: BlogPostValidateMessage.InvalidQuoteContent})
  content: string;

  @ApiProperty({
    description: 'Author of the quote',
    example: 'Some ginger wildling girl'
  })
  @IsString()
  @IsOptional()
  @Length(3, 50, {message: BlogPostValidateMessage.InvalidQuoteAuthor})
  author: string;
}
