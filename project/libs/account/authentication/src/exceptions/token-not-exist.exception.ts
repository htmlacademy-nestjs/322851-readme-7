import { UnauthorizedException } from '@nestjs/common';

export class TokenNotExistException extends UnauthorizedException {
  constructor(tokenId: string) {
    super(`Token with id ${tokenId} not found`);
  }
}
