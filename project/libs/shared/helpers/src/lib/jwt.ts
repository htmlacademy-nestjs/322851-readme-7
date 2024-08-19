import { User, TokenPayload } from '@project/shared-core'

export function createJwtPayload(user: User): TokenPayload {
  return {
    sub: user.id,
    name: user.id
  }
}
