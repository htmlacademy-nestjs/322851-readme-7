import { Transform } from "class-transformer";
import { DEFAULT_COMMENT_COUNT_LIMIT, DEFAULT_PAGE_COUNT, DEFAULT_SORT_DIRECTION } from "./blog-comment.consts";
import { IsIn, IsNumber, IsOptional } from "class-validator";
import { SortDirection } from "@project/shared-core";


export class BlogCommentQuery {
  @Transform(({ value }) => parseInt(value, 10) || DEFAULT_COMMENT_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit: number = DEFAULT_COMMENT_COUNT_LIMIT;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = DEFAULT_SORT_DIRECTION

  @Transform(({ value }) => parseInt(value, 10) || DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page: number = DEFAULT_PAGE_COUNT
}
