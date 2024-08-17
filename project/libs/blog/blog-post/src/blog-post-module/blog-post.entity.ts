import { Entity, LinkPost, PhotoPost, Post, QuotePost, StorableEntity, Tag, TextPost, VideoPost } from "@project/shared-core";
import { PostType } from '@prisma/client';


export class BlogPostEntity extends Entity implements StorableEntity<Post> {
  public createdAt?: Date;
  public updatedAt?: Date;
  public userId: string;
  public type: PostType;
  public isPublished: boolean;
  public isRepost: boolean;
  public originalId?: string;
  public originalAuthor?: string;
  public commentsCount: number;
  public likesCount: number;
  public tags: Tag[];
  public video?: VideoPost;
  public photo?: PhotoPost;
  public link?: LinkPost;
  public quote?: QuotePost;
  public text?: TextPost;


  constructor(post?: Post) {
    super();

    this.populate(post);
  }

  public populate(post?: Post) {
    if (post) {
      this.id = post.id ?? undefined;
      this.createdAt = post.createdAt;
      this.updatedAt = post.updatedAt;
      this.userId = post.userId;
      this.type = post.type;
      this. isPublished = post.isPublished ?? true;
      this.isRepost = post.isRepost ?? false;
      this.originalId = post.originalId ?? undefined;
      this.originalAuthor = post.originalAuthor ?? undefined;
      this.commentsCount = post._count.comments ?? undefined;
      this.likesCount = post._count.likes ?? undefined;
      this.tags = post.tags;
      this.video = post.video  ?? undefined;
      this.photo = post.photo  ?? undefined;
      this.link = post.link  ?? undefined;
      this.quote = post.quote  ?? undefined;
      this.text = post.text  ?? undefined;
    }
  }

  public toPOJO(): Post {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      userId: this.userId,
      type: this.type,
      isPublished: this.isPublished,
      isRepost: this.isRepost,
      originalId: this.originalId,
      originalAuthor: this.originalAuthor,
      commentsCount: this.commentsCount,
      likesCount: this.likesCount,
      tags: this.tags,
      video: this.video,
      photo: this.photo,
      link: this.link,
      quote: this.quote,
      text: this.text
    }
  }
}
