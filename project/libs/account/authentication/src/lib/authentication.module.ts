import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { BlogUserModule, BlogUserRepository } from '@project/blog-user'
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@project/account-config';
import { JwtAccessStrategy } from '../strategies/jwt-access.strategy';
import { AccountNotifyModule } from '@project/account-notify';
import { LocalStartegy } from '../strategies/local.strategy';
import { JwtRefreshStrategy } from '../strategies/jwt-refresh.strategy';

@Module({
  imports: [
    AccountNotifyModule,
    BlogUserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    JwtAccessStrategy,
    LocalStartegy,
    JwtRefreshStrategy
  ],
})
export class AuthenticationModule {
  constructor(
    private readonly blogUserRepsitory: BlogUserRepository
  ) {}
}
