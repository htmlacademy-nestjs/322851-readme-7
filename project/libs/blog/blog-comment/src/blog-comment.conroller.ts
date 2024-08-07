import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BlogCommentService } from './blog-comment.module/blog-comment.service';
import { fillDto } from '@project/shared-helpers';
import { BlogCommentRdo } from './blog-comment.module/rdo/blog-comment.rdo';
import { CreateCommentDto } from './blog-comment.module/dto/create-comment.dto';


@Controller('posts/:postId/comments')
export class BlogCommentComtroller {
  constructor(
    private readonly blogCommentService: BlogCommentService
  ) {}

  @Get('/')
  public async show(@Param('postId') postId: string) {
    const comments = await this.blogCommentService.getComments(postId);
    return fillDto(BlogCommentRdo,  comments.map((comment) => comment.toPOJO()));
  }

  @Post('/')
  public async create(@Param('postId') postId: string, @Body() dto: CreateCommentDto) {
    const newComment = await this.blogCommentService.createComment(dto, postId);
    return fillDto(BlogCommentRdo, newComment);
  }

  @Delete('/:commentId')
  public async delete(@Param('commentId') commentId: string) {
    await this.blogCommentService.deleteComment(commentId);
  };
}
