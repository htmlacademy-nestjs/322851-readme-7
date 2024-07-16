import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { LoginUserDto } from "../dto/login-user.dto";

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService
  ) {}


  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const user = await this.authenticationService.register(dto);
    return user.toPOJO();
  }

  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const user = await this.authenticationService.verify(dto);
    return user.toPOJO();
  }

  @Get(':id')
  public async showUser(@Param('id') id: string) {
    const user = await this.authenticationService.getUser(id);
    return user.toPOJO();
  }
}
