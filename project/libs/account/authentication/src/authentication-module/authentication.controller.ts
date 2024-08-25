import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationMessages } from './authentication.consts';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';
import { UserRdo } from '../rdo/user.rdo';
import { MongoIdValidationPipe } from '@project/pipes';
import { fillDto } from '@project/shared-helpers';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AccountNotifyService } from '@project/account-notify';
import { RequestWithUser } from './request-with-user.interface';
import { LoacalAuthGuard } from '../guards/local-auth.quard';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { RequestWithTokenPayload } from '@project/shared-core';
import { UpdateUserDto } from '../dto/update-user.dto';


@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly notifyService: AccountNotifyService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AuthenticationMessages.UserCreated
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthenticationMessages.UserExist
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const user = await this.authenticationService.register(dto);
    const {email, name} = user;
    await this.notifyService.registerSubscriber({email, name});
    return fillDto(UserRdo, user.toPOJO());
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: AuthenticationMessages.LoggedSuccess
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationMessages.LoggedError
  })
  @UseGuards(LoacalAuthGuard)
  @Post('login')
  public async login(@Req() { user }: RequestWithUser) {
    if (! user) {
      throw new BadRequestException('User not found');
    }
    const userToken = await this.authenticationService.createUserToken(user);

    return fillDto(LoggedUserRdo, {...user.toPOJO(), ...userToken});
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AuthenticationMessages.PasswordUpdated
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationMessages.UserNotFound
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationMessages.Unauthorized
  })
  @UseGuards(JwtAuthGuard)
  @Patch('update')
  public async changePassword(@Body() dto: UpdateUserDto, @Req() { user: payload }: RequestWithTokenPayload) {
    console.log('authentication controller')
    const user = await this.authenticationService.updatePassword(dto, payload?.sub);

    return fillDto(UserRdo, user.toPOJO());
  }


  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: AuthenticationMessages.UserFound
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationMessages.UserNotFound
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async showUser(@Param('id', MongoIdValidationPipe) id: string) {
    const user = await this.authenticationService.getUser(id);
    return fillDto(UserRdo, { ...user.toPOJO(), subscribersCount: 0, postsCount: 0})
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: AuthenticationMessages.RefreshTokens
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationMessages.WrongToken
  })
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  public async refreshToken(@Req() {user}: RequestWithUser) {
    return this.authenticationService.createUserToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('check')
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }
}
