export interface JwtToken {
  id?: string;
  createdAt: Date;
  tokenId: string;
  userId: string;
  expiresIn: Date;
}
