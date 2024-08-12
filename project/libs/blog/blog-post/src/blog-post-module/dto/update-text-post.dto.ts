import { IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BlogPostValidateMessage } from '../blog-post.consts';
import { UpdatePostDto } from './update-post.dto';

export class UpdateTextPostDto extends UpdatePostDto {
  @ApiProperty({
    description: 'Title of the post',
    example: 'Tset title'
  })
  @IsOptional()
  @IsString()
  @Length(20,50, {message:BlogPostValidateMessage.InvalidTextTitle})
  title: string;

  @ApiProperty({
    description: 'Short description of the post',
    example: 'This post is about test'
  })
  @IsOptional()
  @IsString()
  @Length(50, 255, {message:BlogPostValidateMessage.InvalidTextPreview})
  preview: string;

  @ApiProperty({
    description: 'Text of the post',
    example: 'Lorem ipsum abracadabra'
  })
  @IsOptional()
  @IsString()
  @Length(100,1024, {message:BlogPostValidateMessage.InvalidTextContent})
  content: string;
}
