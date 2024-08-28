import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req } from '@nestjs/common';
import { BlogCommentService } from './blog-comment.service';
import { fillDto } from '@project/shared-helpers';
import { BlogCommentRdo } from './rdo/blog-comment.rdo';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlogCommentRespose } from './blog-comment.consts';
import { BlogCommentQuery } from './blog-comment-query';
import { BlogCommentWithPaginationRdo } from './rdo/blog-comment-wtih-pagination';
import { RequestWithTokenPayload } from '@project/shared-core';

@ApiTags('blog comment')
@Controller('/comments')
export class BlogCommentController {
  constructor(
    private readonly blogCommentService: BlogCommentService
  ) {}

  @ApiResponse({
    type: BlogCommentWithPaginationRdo,
    status: HttpStatus.OK,
    description: BlogCommentRespose.CommentsFound
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogCommentRespose.PostNotFound
  })
  @Get('/:postId')
  public async show(@Param('postId') postId: string, @Query() query: BlogCommentQuery) {
    const comments = await this.blogCommentService.getComments(postId, query);
    return fillDto(BlogCommentWithPaginationRdo,  comments);
  }

  @ApiResponse({
    type: BlogCommentRdo,
    status: HttpStatus.CREATED,
    description: BlogCommentRespose.CommentCreated
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogCommentRespose.PostNotFound
  })
  @Post('/:postId')
  public async create(@Param('postId') postId: string, @Body() dto: CreateCommentDto) {
    const newComment = await this.blogCommentService.createComment(dto, postId);
    return fillDto(BlogCommentRdo, newComment);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: BlogCommentRespose.CommentDeleted
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogCommentRespose.CommentNotFound
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: BlogCommentRespose.NotAllowed
  })
  @Delete('/:commentId')
  public async delete(@Param('commentId') commentId: string, @Req() {user}: RequestWithTokenPayload) {
    await this.blogCommentService.deleteComment(commentId, user);
  };
}
