import { CreatePostDto } from './create-post.dto';
import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BlogPostValidateMessage } from '../blog-post.consts';
import { $Enums, PostType } from '@prisma/client';

export class CreateQuotePostDto extends CreatePostDto {
  @ApiProperty({
    description: 'Text of the quote',
    example: 'You know nothing, Jon Snow'
  })
  @IsString()
  @Length(20, 300, {message: BlogPostValidateMessage.InvalidQuoteContent})
  public content: string;

  @ApiProperty({
    description: 'Author of the quote',
    example: 'Some ginger wildling girl'
  })
  @IsString()
  @Length(3, 50, {message: BlogPostValidateMessage.InvalidQuoteAuthor})
  public author: string;

  public type = PostType.QUOTE;
}
