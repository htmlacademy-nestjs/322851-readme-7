import { HttpService } from "@nestjs/axios";
import { Body, Controller, Delete, Get, Param, Post, Req, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApplicationServiceUrl } from "./app.config";
import { CreateCommentDto } from "libs/blog/blog-comment/src/blog-comment.module/dto/create-comment.dto";
import { CheckAuthGuard } from "./guards/check-auth.guard";
import { InjectUserIdInterceptor } from "@project/interceptors";
import { AxiosExceptionFilter } from "./filters/axios.exception-filter";
import { Request } from 'express';
import * as url from 'node:url';

@Controller('/comments')
@UseFilters(AxiosExceptionFilter)
export class CommentController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @Get('/:postId')
  public async show(@Param('postId') postId: string, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceUrl.Comment}/${postId}?${url.parse(req.url).query}`);

    return data;
  }


  @Post('/:postId')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  public async create(@Param('postId') postId: string, @Body() dto: CreateCommentDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceUrl.Comment}/${postId}`, dto);

    return data;
  }


  @Delete('/:commentId')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  public async delete(@Param('commentId') commentId: string) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceUrl.Comment}/${commentId}`);

    return data;
  };
}
