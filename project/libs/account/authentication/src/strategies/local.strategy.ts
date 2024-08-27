import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from '../authentication-module/authentication.service';
import { Injectable } from '@nestjs/common';
import { User } from '@project/shared-core';


const USERNAME_FIELD_NAME = 'email';

@Injectable()
export class LocalStartegy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthenticationService
  ) {
    super({usernameField: USERNAME_FIELD_NAME});
  }

  public async validate(email: string, password: string): Promise<User> {
   return this.authService.verify({email, password});
  }
}
