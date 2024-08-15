import { Entity, StorableEntity,Comment } from '@project/shared-core'

export class BlogCommentEntity extends Entity implements StorableEntity<Comment> {
  text: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  postId: string;

  constructor(comment?: Comment) {
    super();

    this.populate(comment);
  }

  public populate(comment?: Comment) {
    if (comment) {
      this.id = comment.id ?? '';
      this.text = comment.text;
      this.userId = comment.userId;
      this.createdAt = comment.createdAt ?? undefined;
      this.updatedAt = comment.updatedAt ?? undefined;
      this.postId = comment.postId ?? undefined;
    }
  }

  public toPOJO(): Comment {
    return {
      id: this.id,
      text: this.text,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      postId: this.postId,
    }
  }
}
