import { IsMongoId } from "class-validator";
import { BlogPostValidateMessage } from "../blog-post.consts";


export class RepostDto {
  @IsMongoId({message: BlogPostValidateMessage.InvalidUserId})
  public userId: string;
}
