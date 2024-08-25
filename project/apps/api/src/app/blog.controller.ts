import { HttpService } from "@nestjs/axios";
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApplicationServiceUrl } from "./app.config";
import { CreatePostDto, UpdatePostDto } from '@project/blog-post';
import { BlogLikeDto } from "@project/blog-like";
import { CheckAuthGuard } from "./guards/check-auth.guard";
import * as url from 'node:url';
import { AxiosExceptionFilter } from "./filters/axios.exception-filter";
import { InjectUesrIdInterceptor } from "@project/interceptors";

@Controller('/posts')
@UseFilters(AxiosExceptionFilter)
export class BlogController {
  constructor(
    private readonly httpService: HttpService
  ) {}


  @Get('/')
  public async index(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceUrl.Blog}?${url.parse(req.url).query}`);

    return data;
  }


  @Get('/:id')
  public async show(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceUrl.Blog}/${id}`);

    return data;
  }


  @Post('/')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUesrIdInterceptor)
  public async create(@Body() dto: CreatePostDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceUrl.Blog}/`, dto);

    return data;
  }


  @Patch('/:id')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUesrIdInterceptor)
  public async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceUrl.Blog}/${id}`, dto);

    return data;
  }


  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUesrIdInterceptor)
  public async delete(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceUrl.Blog}/${id}`);

    return data;
  }

  @Post('/addLike/:postId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUesrIdInterceptor)
  public async saveLike(@Param('postId') postId: string, @Body() dto: BlogLikeDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceUrl.Blog}/addLike/${postId}`, dto);

    return data;
  }

  @Post('/removeLike/:postId')
  @UseGuards(CheckAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseInterceptors(InjectUesrIdInterceptor)
  public async deleteLike(@Param('postId') postId: string, @Body() dto: BlogLikeDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceUrl.Blog}/removeLike/${postId}`, dto);

    return data;
  }
}
