import { IsBoolean, IsIn, IsMongoId, IsString, IsUUID, IsOptional, IsArray, ValidateNested, ArrayMaxSize, Length } from 'class-validator';
import { PostType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { BlogPostValidateMessage } from '../blog-post.consts';
import { Type } from 'class-transformer';
import { CreateTextPostDto } from './create-text-post.dto';
import { CreatePhotoPostDto } from './create-photo-post.dto';
import { CreateVideoPostDto } from './create-video-post.dto';
import { CreateLinkPostDto } from './create-link-post.dto';
import { CreateQuotePostDto } from './create-quote-post.dto';

export class CreatePostDto {
  @ApiProperty({
    description: 'One of the five type: video, photo, text, link, quote',
    example: 'Video'
  })
  @IsIn(Object.values(PostType), {message: BlogPostValidateMessage.WrongType})
  public type: PostType;

  @ApiProperty({
    description: 'Repost flag',
    example: 'true'
  })
  @IsOptional()
  @IsBoolean({message: BlogPostValidateMessage.WrongRepostStatus})
  public isRepost: boolean;

  @ApiProperty({
    description: 'IsPublished flag',
    example: 'true'
  })
  @IsOptional()
  @IsBoolean({message: BlogPostValidateMessage.WrongRepostStatus})
  public isPublished?: boolean;

  @ApiProperty({
    description: 'If Repost flag is true, shows the original post ID. ',
    example: '0a7cbc9e-9754-4187-ad0f-5b99d4b0814b'
  })
  @IsOptional()
  @IsString()
  @IsUUID('all',{message: BlogPostValidateMessage.InvalidPostId})
  public originalId?: string;

  @ApiProperty({
    description: 'If Repost flag is true, shows the original post author ID.',
    example: '669aef3b7eadb26966f3c2cb'
  })
  @IsOptional()
  @IsMongoId({message: BlogPostValidateMessage.InvalidUserId})
  public originalAuthor?: string;

  @ApiProperty({
    description: 'List of tags titles',
    example: ['#js', '#helloworld']
  })
  @IsArray()
  @ArrayMaxSize(8, {message: BlogPostValidateMessage.TagCount})
  @IsString({each: true})
  @Length(3, 10, {each: true, message: BlogPostValidateMessage.TagLength })
  public tags: string[]

  @ApiProperty({
    description: 'Id of the owner of the post',
    example: '669aef3b7eadb26966f3c2cb'
  })
  @IsMongoId({message: BlogPostValidateMessage.InvalidUserId})
  public userId: string;

  @ValidateNested()
  @IsOptional()
  @Type(() => CreateTextPostDto)
  public text?: CreateTextPostDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => CreateVideoPostDto)
  public video?: CreateVideoPostDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => CreatePhotoPostDto)
  public photo?: CreatePhotoPostDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => CreateLinkPostDto)
  public link?: CreateLinkPostDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => CreateQuotePostDto)
  public quote?: CreateQuotePostDto;
}
