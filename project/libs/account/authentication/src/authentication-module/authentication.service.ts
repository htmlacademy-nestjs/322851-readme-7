import { ConflictException, HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { BlogUserEntity, BlogUserRepository } from '@project/blog-user';
import { CreateUserDto } from '../dto/create-user.dto';
import { AUTH_USER_EXIST, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './authentication.consts';
import { LoginUserDto } from '../dto/login-user.dto';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Token, User } from '@project/shared-core';
import { jwtConfig } from '@project/account-config';
import { RefreshTokenService } from '../refresh-token-module/refresh-token.service';
import { createJwtPayload } from '@project/shared-helpers';
import { randomUUID } from 'crypto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly refsreshTokenService: RefreshTokenService,
    private readonly blogUserRepsitory: BlogUserRepository,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>
  ) {
  }

  public async register({ name, email, password }: CreateUserDto) {
    const blogUser = {
      name,
      email,
      avatar: '',
      passwordHash: '',
      subscriptions: [],
      subscribersCount: 0,
      postsCount: 0
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

  public async updatePassword( dto: UpdateUserDto, id?: string,) {
    if (!id) {
      throw new UnauthorizedException('Login to change password')
    }

    const existUser = await this.blogUserRepsitory.findById(id);

    if (! existUser) {
      throw new NotFoundException(`User whith id ${id} not found`)
    }

    const userEntity = await existUser.setPassword(dto.password);
    this.blogUserRepsitory.updatePassword(id, userEntity.passwordHash);
    return userEntity;
  }

  public async incrementPostsCount( userId: string) {
    const existUser = await this.blogUserRepsitory.findById(userId);
    if (existUser) {
      existUser.postsCount += 1;
      await this.blogUserRepsitory.update(existUser);
    }

  }

  public async reducePostsCount( userId: string) {
    const existUser = await this.blogUserRepsitory.findById(userId);
    if (existUser) {
      existUser.postsCount -= 1;
      await this.blogUserRepsitory.update(existUser);
    }
  }

  public async updateSubscription( userId: string, userToSubscribe: BlogUserEntity) {
    const existUser = await this.blogUserRepsitory.findById(userId);

    if (! existUser) {
      throw new NotFoundException(`User whith id ${userId} not found`)
    }

    if (existUser.subscriptions.includes(userToSubscribe.id)) {
      existUser.subscriptions = existUser.subscriptions.filter((id) => id !== userToSubscribe.id);
      userToSubscribe.subscribersCount -= 1;
    } else {
      existUser.subscriptions.push(userToSubscribe.id);
      userToSubscribe.subscribersCount += 1;
    }

    await Promise.all([
      this.blogUserRepsitory.update(existUser),
      this.blogUserRepsitory.update(userToSubscribe),
    ])

    return existUser;
  }

  public async createUserToken(user: User): Promise<Token> {
    const accessPayload = createJwtPayload(user);
    const refreshPayload = { ...accessPayload, tokenId: randomUUID() }

    await this.refsreshTokenService.createRefreshToken(refreshPayload);

    try {
      const accessToken = await this.jwtService.signAsync(accessPayload);
      const refreshToken = await this.jwtService.signAsync(refreshPayload, {
        secret: this.jwtOptions.jwtRefreshTokenSecret,
        expiresIn: this.jwtOptions.jwtRefreshTokenExpiresIn
      });
      return { accessToken, refreshToken };
    } catch(error) {
      this.logger.error(`[Token generation error]: ${ error }`);
      throw new HttpException('Ошибка при создании токена', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
