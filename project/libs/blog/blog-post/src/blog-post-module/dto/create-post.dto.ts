import { IsBoolean, IsIn, IsMongoId, IsString, IsUUID, IsOptional, IsArray } from 'class-validator';
import { PostType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { BlogPostValidateMessage } from '../blog-post.consts';
import { Tag } from '@project/shared-core';

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
  @IsOptional()
  public tags: Tag[]

  @ApiProperty({
    description: 'Id of the owner of the post',
    example: '669aef3b7eadb26966f3c2cb'
  })
  @IsMongoId({message: BlogPostValidateMessage.InvalidUserId})
  public userId: string;
}
