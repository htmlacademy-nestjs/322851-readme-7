import { Body, Controller, Get, HttpStatus, Param, Post } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { LoginUserDto } from "../dto/login-user.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthenticationMessages } from "./authentication.consts";
import { LoggedUserRdo } from "../rdo/logged-user.rdo";
import { UserRdo } from "../rdo/user.rdo";

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService
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
    return user.toPOJO();
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
  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const user = await this.authenticationService.verify(dto);
    return user.toPOJO();
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
  @Get(':id')
  public async showUser(@Param('id') id: string) {
    const user = await this.authenticationService.getUser(id);
    return user.toPOJO();
  }
}
