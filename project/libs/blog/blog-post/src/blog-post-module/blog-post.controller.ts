import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { BlogPostService } from './blog-post.service';
import { BlogPostQuery } from './blog-post.query';
import { BlogPostRdo } from './rdo/blog-post.rdo';
import { fillDto } from '@project/shared-helpers'
import { BlogPostWithPaginationRdo } from './rdo/blog-post-with-pagination.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlogPostResponse } from './blog-post.consts';
import { UpdateCommonPostDto } from './dto/update-common-post.dto';
import { CreateCommonPostDto } from './dto/create-common-post.dto';


@ApiTags('blog post')
@Controller('/posts')
export class BlogPostController {
  constructor(
    private readonly blogPostService: BlogPostService
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogPostResponse.PostsFound
  })
  @Get('/')
  public async index(@Query() query: BlogPostQuery) {
    const postWithPagination = await this.blogPostService.getAll(query);

    const result = {
      ...postWithPagination,
      entities: postWithPagination.entities.map((entity) => entity.toPOJO())
    }

    return fillDto(BlogPostWithPaginationRdo, result);
  }

  @ApiResponse({
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
    status: HttpStatus.CREATED,
    description: BlogPostResponse.PostCreated
  })
  @Post('/')
  public async create(@Body() dto: CreateCommonPostDto) {
    const newPost = await this.blogPostService.createPost(dto);

    return fillDto(BlogPostRdo, newPost.toPOJO());
  }

  @ApiResponse({
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
  public async update(@Param('id') id: string, @Body() dto: UpdateCommonPostDto) {
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

}
