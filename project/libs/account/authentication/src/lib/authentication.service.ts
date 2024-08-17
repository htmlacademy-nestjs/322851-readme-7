import { ConflictException, HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { BlogUserEntity, BlogUserRepository } from "@project/blog-user";
import { CreateUserDto } from "../dto/create-user.dto";
import { AUTH_USER_EXIST, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from "./authentication.consts";
import { LoginUserDto } from "../dto/login-user.dto";
import { dbConfig } from '@project/account-config'
import { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Token, TokenPayload, User } from "@project/shared-core";

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly blogUserRepsitory: BlogUserRepository,
    @Inject(dbConfig.KEY) databaseConfig: ConfigType<typeof dbConfig>
  ) {
    console.log(databaseConfig.host);
    console.log(databaseConfig.user);
  }

  public async register({ name, email, password }: CreateUserDto) {
    const blogUser = {
      name,
      email,
      avatar: '',
      passwordHash: ''
    }

    const existUser = await this.blogUserRepsitory.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXIST);
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password);
    this.blogUserRepsitory.save(userEntity);
    return userEntity;
  }

  public async verify({ email, password }: LoginUserDto) {
    const existUser = await this.blogUserRepsitory.findByEmail(email);

    if (! existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (! await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUser(id: string) {
    const existUser = await this.blogUserRepsitory.findById(id);

    if (! existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    return existUser;
  }

  public async createUserToken(user: User): Promise<Token> {
    const payload: TokenPayload = {
      sub: user.id ?? '',
      email: user.email,
      name: user.name
    }

    try {
      const accessToken = await this.jwtService.signAsync(payload);
      console.log(accessToken);
      return { accessToken };
    } catch(error) {
      this.logger.error(`[Token generation error]: ${ error }`);
      throw new HttpException('Ошибка при создании токена', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
