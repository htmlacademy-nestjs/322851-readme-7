import { ApiProperty } from '@nestjs/swagger';
import { Post } from '@project/shared-core';
import { IsMongoId } from 'class-validator';

export class BlogNotifyDto {
  @ApiProperty({
    description: 'Id of the subscriber',
    example: '669aef3b7eadb26966f3c2cb'
  })
  @IsMongoId()
  public subscriberId: string;

  public posts: Post[];
}
