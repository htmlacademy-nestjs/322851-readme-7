import { Entity, StorableEntity, Tag } from '@project/shared-core'

export class BlogTagEntity extends Entity implements StorableEntity<Tag> {
  public title: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(tag?: Tag) {
    super();

    this.populate(tag);
  }

  public populate(tag?: Tag) {
    if (tag) {
      this.title = tag.title;
      this.createdAt = tag.createdAt ?? undefined;
      this.updatedAt = tag.updatedAt ?? undefined;
      this.id = tag.id ?? undefined;
    }
  }

  public toPOJO(): Tag {
    return {
      title: this.title,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      id: this.id
    }
  }


}
