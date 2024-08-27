import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer'

export class BlogCommentRdo {
  @ApiProperty({
    description: 'ID of the comment',
    example: '52113039-e14e-400e-ae1f-c68cef104bb0'
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Text of the comment',
    example: 'Test text of the comment'
  })
  @Expose()
  text: string;

  @ApiProperty({
    description: 'Id of the comment\'s author',
    example: '669aef3b7eadb26966f3c2cb'
  })
  @Expose()
  userId: string;

  @ApiProperty({
    description: 'Date of post creation in iso format',
    example: '2024-08-13 21:15:05.712'
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: 'Id of commet\'s post',
    example: '52113039-e14e-400e-ae1f-c68cef104bb0'
  })
  @Expose()
  postId: string;
}
