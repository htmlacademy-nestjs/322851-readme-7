import { IsBoolean, IsMongoId, IsString, IsUUID, IsOptional, IsArray, ValidateNested, ArrayMaxSize, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BlogPostValidateMessage } from '../blog-post.consts';
import { Type } from 'class-transformer';
import { UpdateTextPostDto } from './update-text-post.dto';
import { UpdateVideoPostDto } from './update-video-post.dto';
import { UpdatePhotoPostDto } from './update-photo-post.dto';
import { UpdateQuotePostDto } from './update-quote-post.dto';
import { UpdateLinkPostDto } from './update-link-post.dto';

export class UpdatePostDto {
  @ApiProperty({
    description: 'Repost flag',
    example: 'true'
  })
  @IsOptional()
  @IsBoolean({message: BlogPostValidateMessage.WrongRepostStatus})
  public isRepost: boolean;

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
  public tags?: string[]

  @ValidateNested()
  @IsOptional()
  @Type(() => UpdateTextPostDto)
  public text?: UpdateTextPostDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => UpdateVideoPostDto)
  public video?: UpdateVideoPostDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => UpdatePhotoPostDto)
  public photo?: UpdatePhotoPostDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => UpdateLinkPostDto)
  public link?: UpdateLinkPostDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => UpdateQuotePostDto)
  public quote?: UpdateQuotePostDto;
}
