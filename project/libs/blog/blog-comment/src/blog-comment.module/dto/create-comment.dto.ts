import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString, Length } from 'class-validator';
import { BlogCommentValidateMessage } from '../blog-comment.consts';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment message',
    example: 'Some funny comment'})
  @IsString()
  @Length(10, 300, {message: BlogCommentValidateMessage.TextNotValid})
  text: string;

  @ApiProperty({
    description: 'User Id',
    example: '669aef3b7eadb26966f3c2cb'})
  @IsMongoId({message: BlogCommentValidateMessage.InvalidId})
  userId: string;
}
