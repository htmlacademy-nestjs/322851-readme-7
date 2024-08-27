import { Inject, Injectable } from '@nestjs/common';
import { RefreshTokenRepository } from './refresh-token.repository';
import { ConfigType } from '@nestjs/config';
import { jwtConfig } from '@project/account-config';
import { RefreshTokenPayload } from '@project/shared-core';
import { parseTime } from '@project/shared-helpers';
import { RefreshTokenEntity } from './refresh-token.entity';
import dayjs from 'dayjs';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly tokenRepository: RefreshTokenRepository,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>
  ) {}

  public async createRefreshToken(payload: RefreshTokenPayload ) {
    const time = parseTime(this.jwtOptions.jwtRefreshTokenExpiresIn);
    const refreshToken = new RefreshTokenEntity({
      expiresIn: dayjs().add(time.value, time.unit).toDate(),
      userId: payload.sub,
      tokenId: payload.tokenId,
      createdAt: new Date()
    });

    await this.tokenRepository.save(refreshToken);
    }


  public async deleteRefreshToken(tokenId: string): Promise<void> {
    await this.tokenRepository.deleteByTokenId(tokenId);
  }

  public async deleteExpiredRefreshTokens(): Promise<void> {
    await this.tokenRepository.deleteExpiredTokens();
  }

  public async isExist(tokenId: string): Promise<boolean> {
    const refreshToken = await this.tokenRepository.findByTokenId(tokenId);
    return refreshToken !== null;
  }
}
