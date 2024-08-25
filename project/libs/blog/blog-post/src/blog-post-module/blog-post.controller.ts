import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { BlogPostService } from './blog-post.service';
import { BlogPostQuery } from './blog-post.query';
import { BlogPostRdo } from './rdo/blog-post.rdo';
import { fillDto } from '@project/shared-helpers'
import { BlogPostWithPaginationRdo } from './rdo/blog-post-with-pagination.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlogPostResponse } from './blog-post.consts';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { BlogLikeService } from 'libs/blog/blog-like/src/blog-like-module/blog-like.service';
import { BlogLikeDto } from '@project/blog-like';

@ApiTags('blog post')
@Controller('/posts')
export class BlogPostController {
  constructor(
    private readonly blogPostService: BlogPostService,
    private readonly blogLikeService: BlogLikeService
  ) {}

  @ApiResponse({
    type: BlogPostWithPaginationRdo,
    status: HttpStatus.OK,
    description: BlogPostResponse.PostsFound
  })
  @Get('/')
  public async index(@Query() query: BlogPostQuery) {
    const postWithPagination = await this.blogPostService.getAll(query);

    const post = {
      ...postWithPagination,
      entities: postWithPagination.entities.map((post) => post.toPOJO())
    }

    return fillDto(BlogPostWithPaginationRdo, post);
  }

  @ApiResponse({
    type: BlogPostRdo,
    status: HttpStatus.OK,
    description: BlogPostResponse.PostFound
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponse.PostNotFound
  })
  @Get('/:id')
  public async show(@Param('id') id: string) {
    const post = await this.blogPostService.getPost(id);

    return fillDto(BlogPostRdo, post.toPOJO());
  }

  @ApiResponse({
    type: BlogPostRdo,
    status: HttpStatus.CREATED,
    description: BlogPostResponse.PostCreated
  })
  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    const newPost = await this.blogPostService.createPost(dto);

    return fillDto(BlogPostRdo, newPost.toPOJO());
  }

  @ApiResponse({
    type: BlogPostRdo,
    status: HttpStatus.ACCEPTED,
    description: BlogPostResponse.PostUpdated
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogPostResponse.NotAuthorized
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponse.PostNotFound
  })
  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const post = await this.blogPostService.updatePost(id, dto);

    return fillDto(BlogPostRdo, post.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: BlogPostResponse.PostDeleted
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogPostResponse.NotAuthorized
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponse.PostNotFound
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string) {
    await this.blogPostService.deletePost(id)
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: BlogPostResponse.LikeAdded
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogPostResponse.GetLogin
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponse.PostNotFound
  })
  @Post('addLike/:postId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async saveLike(@Param('postId') postId: string, @Body() {userId}: BlogLikeDto) {
    await this.blogLikeService.addLike({postId, userId});
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: BlogPostResponse.LikeRemoved
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogPostResponse.GetLogin
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponse.PostNotFound
  })
  @Post('removeLike/:postId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteLike(@Param('postId') postId: string, @Body() {userId}: BlogLikeDto) {
    await this.blogLikeService.removeLike({postId, userId});
  }

}
