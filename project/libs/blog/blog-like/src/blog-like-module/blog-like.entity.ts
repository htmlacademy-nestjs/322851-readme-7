import { Entity, StorableEntity, Like } from '@project/shared-core';


export class BlogLikeEntity extends Entity implements StorableEntity<Like> {
  postId: string;
  userId: string;

  constructor(like?: Like) {
    super();

    this.populate(like);
  }

  private populate(like?: Like) {
    if (like) {
      this.postId = like.postId;
      this.userId = like.userId;
    }
  }

  public toPOJO(): Like {
    return {
      postId: this.postId,
      userId: this.userId
    }
  }
}
