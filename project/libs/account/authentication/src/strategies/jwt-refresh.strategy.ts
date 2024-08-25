import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConfig } from '@project/account-config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthenticationService } from '../authentication-module/authentication.service';
import { RefreshTokenPayload } from '@project/shared-core';
import { RefreshTokenService } from '../refresh-token-module/refresh-token.service';
import { TokenNotExistException } from '../exceptions/token-not-exist.exception';


@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly authService: AuthenticationService,
    private readonly tokenService: RefreshTokenService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtOptions.jwtRefreshTokenSecret
    });
  }

  public async validate(payload: RefreshTokenPayload) {

    if (! await this.tokenService.isExist(payload.tokenId)) {
      throw new TokenNotExistException(payload.tokenId);
    }

    await Promise.all([
      this.tokenService.deleteRefreshToken(payload.tokenId),
      this.tokenService.deleteExpiredRefreshTokens()
    ])

    return this.authService.getUser(payload.sub);
  }
}
