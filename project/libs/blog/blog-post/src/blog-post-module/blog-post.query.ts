import { IsArray, IsIn, IsNumber, IsOptional, IsUUID } from "class-validator";
import { DEFAULT_PAGE_COUNT, DEFAULT_POST_COUNT_LIMIT, DEFAULT_SORT_DIRECTION } from "./blog-post.consts";
import { SortDirection } from "@project/shared-core";
import { Transform } from "class-transformer";

export class BlogPostQuery {
  @Transform(({ value }) => parseInt(value, 10) || DEFAULT_POST_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit: number = DEFAULT_POST_COUNT_LIMIT;

  @IsUUID('all', {each: true})
  @IsArray()
  @IsOptional()
  public tags?: string[];

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = DEFAULT_SORT_DIRECTION

  @Transform(({ value }) => parseInt(value, 10) || DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page: number = DEFAULT_PAGE_COUNT
}
