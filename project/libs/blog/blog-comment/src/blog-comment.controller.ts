import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { BlogCommentService } from './blog-comment.module/blog-comment.service';
import { fillDto } from '@project/shared-helpers';
import { BlogCommentRdo } from './blog-comment.module/rdo/blog-comment.rdo';
import { CreateCommentDto } from './blog-comment.module/dto/create-comment.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlogCommentRespose } from './blog-comment.module/blog-comment.consts';
import { BlogCommentQuery } from './blog-comment-query';
import { BlogCommentWithPaginationRdo } from './blog-comment.module/rdo/blog-comment-wtih-pagination';


@ApiTags('blog comment')
@Controller('/comments')
export class BlogCommentController {
  constructor(
    private readonly blogCommentService: BlogCommentService
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogCommentRespose.CommentsFound
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogCommentRespose.PostNotFound
  })
  @Get('/:postId')
  public async show(@Param('postId') postId: string, @Query() query: BlogCommentQuery) {
    const commentsWithPagination = await this.blogCommentService.getComments(postId, query);
    const comments = {
      ...commentsWithPagination,
      entities: commentsWithPagination.entities.map((comment) => comment.toPOJO())
    }
    return fillDto(BlogCommentWithPaginationRdo,  comments);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: BlogCommentRespose.CommentCreated
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogCommentRespose.PostNotFound
  })
  @Post('/:postId')
  public async create(@Param('postId') postId: string, @Body() dto: CreateCommentDto) {
    console.log(dto, postId)
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
  @Delete('/:commentId')
  public async delete(@Param('commentId') commentId: string) {
    await this.blogCommentService.deleteComment(commentId);
  };
}
