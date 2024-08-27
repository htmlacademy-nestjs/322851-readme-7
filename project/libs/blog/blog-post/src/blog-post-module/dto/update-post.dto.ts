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
    description: 'Author ID.',
    example: '669aef3b7eadb26966f3c2cb'
  })
  @IsOptional()
  @IsMongoId({message: BlogPostValidateMessage.InvalidUserId})
  public userId?: string;

  @ApiProperty({
    description: 'IsPublished flag',
    example: 'true'
  })
  @IsOptional()
  @IsBoolean({message: BlogPostValidateMessage.WrongRepostStatus})
  public isPublished?: boolean;

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
