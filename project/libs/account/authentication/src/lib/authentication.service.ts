import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { BlogUserEntity, BlogUserRepository } from "@project/blog-user";
import { CreateUserDto } from "../dto/create-user.dto";
import { AUTH_USER_EXIST, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from "./authentication.consts";
import { LoginUserDto } from "../dto/login-user.dto";
import { dbConfig } from '@project/account-config'
import { ConfigType } from "@nestjs/config";

@Injectable()
export class AuthenticationService {
  constructor(
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

    console.log('Exist User', existUser);

    if (! existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    return existUser;
  }
}
