import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length} from 'class-validator';
export class TagDto {
  @ApiProperty({
    description: 'Unique tag for blog posts',
    example: 'js'
  })
  @IsString()
  @Length(3, 10, {message: "Tag length should be between 3-10 characters"})
  public title: string;
}
