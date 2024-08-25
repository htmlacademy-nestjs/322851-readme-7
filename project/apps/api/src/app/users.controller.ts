import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Param, Patch, Post, Req, UseFilters } from '@nestjs/common';
import {  CreateUserDto, LoginUserDto } from '@project/authentication';
import { ApplicationServiceUrl } from './app.config';
import { AxiosExceptionFilter } from './filters/axios.exception-filter';
import { UpdateUserDto } from 'libs/account/authentication/src/dto/update-user.dto';

@Controller('/users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) {}


  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
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
  public async showUser(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceUrl.Users}/${id}`);

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
  public async checkhToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceUrl.Users}/check`, null, {
      headers: {
        Authorization: req.headers['authorization']
      }
    });

    return data;
  }
}
