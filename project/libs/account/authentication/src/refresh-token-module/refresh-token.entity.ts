import { Entity, JwtToken, StorableEntity } from '@project/shared-core';

export class RefreshTokenEntity extends Entity implements StorableEntity<JwtToken> {
  public createdAt: Date;
  public tokenId: string;
  public userId: string;
  public expiresIn: Date;

  constructor(token?: JwtToken) {
    super();

    this.populate(token);
  }

  private populate(token?: JwtToken) {
    if (token) {
      this.createdAt = token.createdAt;
      this.tokenId = token.tokenId;
      this.userId = token.userId;
      this.expiresIn = token.expiresIn;
      this.id = token.id ?? '';
    }
  }

  public toPOJO(): JwtToken {
    return {
      id: this.id,
      createdAt: this.createdAt,
      tokenId: this.tokenId,
      userId: this.userId,
      expiresIn: this.expiresIn,
    }
  }
}
