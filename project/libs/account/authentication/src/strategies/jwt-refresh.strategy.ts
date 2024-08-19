import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConfig } from '@project/account-config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthenticationService } from '../lib/authentication.service';
import { TokenPayload } from '@project/shared-core';


@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly authService: AuthenticationService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtOptions.jwtRefreshTokenSecret
    });
  }

  public async validate(payload: TokenPayload) {
    return this.authService.getUser(payload.sub);
  }
}
