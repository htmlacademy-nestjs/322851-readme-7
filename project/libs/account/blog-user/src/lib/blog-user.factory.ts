import { AuthUser, EntityFactory } from "@project/shared-core";
import { BlogUserEntity } from "./blog-user.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BlogUserFactory implements EntityFactory<BlogUserEntity> {
  create(entityPlainData: AuthUser): BlogUserEntity {
    return new BlogUserEntity(entityPlainData);
  }
}
