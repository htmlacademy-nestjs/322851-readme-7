import { CreatePostDto } from './create-post.dto';
import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BlogPostValidateMessage } from '../blog-post.consts';
import { PostType } from '@prisma/client';

export class CreateTextPostDto extends CreatePostDto {
  @ApiProperty({
    description: 'Title of the post',
    example: 'Tset title'
  })
  @IsString()
  @Length(20,50, {message:BlogPostValidateMessage.InvalidTextTitle})
  public title: string;

  @ApiProperty({
    description: 'Short description of the post',
    example: 'This post is about test'
  })
  @IsString()
  @Length(50, 255, {message:BlogPostValidateMessage.InvalidTextPreview})
  public preview: string;

  @ApiProperty({
    description: 'Text of the post',
    example: 'Lorem ipsum abracadabra'
  })
  @IsString()
  @Length(100,1024, {message:BlogPostValidateMessage.InvalidTextContent})
  public content: string;

  public type = PostType.TEXT;
}
