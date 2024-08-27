import { HttpService } from "@nestjs/axios";
import { Body, Controller, Delete, FileTypeValidator, Get, HttpCode, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, Req, UploadedFile, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApplicationServiceUrl } from "./app.config";
import { CreatePostDto, UpdatePostDto } from '@project/blog-post';
import { CheckAuthGuard } from "./guards/check-auth.guard";
import * as url from 'node:url';
import { AxiosExceptionFilter } from "./filters/axios.exception-filter";
import { InjectUserIdInterceptor } from "@project/interceptors";
import { AuthUser, File, RequestWithTokenPayload } from "@project/shared-core";
import { RepostDto } from "libs/blog/blog-post/src/blog-post-module/dto/repost-dto";
import { FileInterceptor } from "@nestjs/platform-express";
import 'multer';
import FormData from 'form-data';
import { createUrlForFile } from "@project/shared-helpers";
import { UserIdDto } from "libs/blog/blog-post/src/blog-post-module/dto/user-id.dto";

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
  @UseInterceptors(InjectUserIdInterceptor)
  @UseInterceptors(FileInterceptor('file'))
  public async create(
    @Body() dto: CreatePostDto,
    @UploadedFile(
      new ParseFilePipe({
                    validators: [
                      new MaxFileSizeValidator({ maxSize: 1000000 }),
                      new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                    ],
                    fileIsRequired: false
                  }),
                ) file?: Express.Multer.File) {
    console.log(dto);
    if (file) {
      const formData = new FormData();
      formData.append('file', file.buffer, file.originalname)
      const { data: fileMetaData } = await this.httpService.axiosRef.post<File>(`${ApplicationServiceUrl.File}/api/files/upload`, formData, {
        headers: formData.getHeaders()
      });
      dto.photo.path = createUrlForFile(fileMetaData, ApplicationServiceUrl.File);
    }
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceUrl.Blog}/`, dto);
    await this.httpService.axiosRef.post(`${ApplicationServiceUrl.Users}/incrementPostsCount`, dto.userId);

    return data;
  }


  @Patch('/:id')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  public async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceUrl.Blog}/${id}`, dto);

    return data;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(CheckAuthGuard)
  public async delete(@Param('id') id: string, @Req() req: RequestWithTokenPayload) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceUrl.Blog}/${id}/${req.user.sub}`);
    await this.httpService.axiosRef.post(`${ApplicationServiceUrl.Users}/reducePostsCount`, req.user.sub);
    return data;
  }

  @Post('/addLike/:postId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  public async saveLike(@Param('postId') postId: string, @Body() dto: UserIdDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceUrl.Blog}/addLike/${postId}`, dto);

    return data;
  }

  @Post('/removeLike/:postId')
  @UseGuards(CheckAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseInterceptors(InjectUserIdInterceptor)
  public async deleteLike(@Param('postId') postId: string, @Body() dto: UserIdDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceUrl.Blog}/removeLike/${postId}`, dto);

    return data;
  }

  @Post('/repost/:postId')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  public async makeRepost(@Param('postId') postId: string, @Body() dto: RepostDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceUrl.Blog}/repost/${postId}`, dto);

    return data;
  }

  @Post('/sendEmail')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async sendEmail(@Body() dto: UserIdDto) {
    await this.httpService.axiosRef.post(`${ApplicationServiceUrl.Blog}/sendPosts`, dto);
  }

  @Post('/feed')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  public async feed(@Req() req: Request, @Body() {userId}: UserIdDto) {
    const { data: user } = await this.httpService.axiosRef.get<AuthUser>(`${ApplicationServiceUrl.Users}/${userId}`, {
      headers: {
        Authorization: req.headers['authorization']
      }
    });
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceUrl.Blog}/feed?${url.parse(req.url).query}`, [ ...user.subscriptions, userId]);

    return data;
  }
}
