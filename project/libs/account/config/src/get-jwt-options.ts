import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt'


export async function getJwtOptions(configService: ConfigService): Promise<JwtModuleOptions> {
  return {
    secret: configService.get<string>('jwt.jwtAccessTokenSecret'),
    signOptions: {
      expiresIn: configService.get<string>('jwt.jwtAccessTokenExpiresIn'),
      algorithm: 'HS256',
    }
  }
}
