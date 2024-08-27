import { HttpService } from '@nestjs/axios';
import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, Req, UploadedFile, UseFilters, UseInterceptors } from '@nestjs/common';
import {  CreateUserDto, LoginUserDto } from '@project/authentication';
import { ApplicationServiceUrl } from './app.config';
import { AxiosExceptionFilter } from './filters/axios.exception-filter';
import { UpdateUserDto } from 'libs/account/authentication/src/dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';
import FormData from 'form-data';
import { createUrlForFile } from "@project/shared-helpers";
import { File } from '@project/shared-core';

const DEFAULT_AVATAR_PATH = `${ApplicationServiceUrl.File}/static/deafault-avatar.jpg`

@Controller('/users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) {}


  @Post('register')
  @UseInterceptors(FileInterceptor('avatar'))
  public async create(
    @Body() dto: CreateUserDto,
    @UploadedFile(
      new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 500000 }),
        new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
      ],
      fileIsRequired: false
    }),
  ) avatar?: Express.Multer.File) {

    dto.avatar = DEFAULT_AVATAR_PATH

    if (avatar) {
      const formData = new FormData();
      formData.append('file', avatar.buffer, avatar.originalname)
      const { data: fileMetaData } = await this.httpService.axiosRef.post<File>(`${ApplicationServiceUrl.File}/api/files/upload`, formData, {
        headers: formData.getHeaders()
      });
      dto.avatar = createUrlForFile(fileMetaData, ApplicationServiceUrl.File);
    }

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceUrl.Users}/register`, dto);

    return data;
  }


  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceUrl.Users}/login`, dto);

    return data;
  }

  @Patch('update')
  public async update(@Body() dto: UpdateUserDto, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceUrl.Users}/update`, dto, {
      headers: {
        Authorization: req.headers['authorization']
      }
    });

    return data;
  }


  @Get(':id')
  public async showUser(@Param('id') id: string, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceUrl.Users}/${id}`, {
      headers: {
        Authorization: req.headers['authorization']
      }
    });

    return data;
  }


  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceUrl.Users}/refresh`, null, {
      headers: {
        Authorization: req.headers['authorization']
      }
    });

    return data;
  }

  @Post('check')
  public async checkToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceUrl.Users}/check`, null, {
      headers: {
        Authorization: req.headers['authorization']
      }
    });

    return data;
  }

  @Post('subscribe/:id')
  public async subscribe(@Param('id') id: string, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceUrl.Users}/subscribe/${id}`, null, {
      headers: {
        Authorization: req.headers['authorization']
      }
    });

    return data;
  }


}
