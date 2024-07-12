import { Entity, StorableEntity, AuthUser } from '@project/shared-core';

const DEFAULT_USER_AVATAR = 'default-avatar.jpg'

export class BlogUserEntity extends Entity implements StorableEntity<AuthUser> {
  public email: string;
  public name: string;
  public avatar?: string;
  public passwordHash: string;

  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthUser): void {
    if (user) {
      this.email = user.email;
      this.name = user.name;
      this.avatar = user?.avatar ?? DEFAULT_USER_AVATAR;
      this.passwordHash = user.passwordHash;
    }
  }

  public toPOJO(): AuthUser {
    return {
      id: this.id,
      email: this.email,
      avatar: this.avatar,
      name: this.name,
      passwordHash: this.passwordHash
    }
  }
}
