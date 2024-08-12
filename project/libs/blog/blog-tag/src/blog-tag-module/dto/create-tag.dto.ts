import { ApiProperty } from "@nestjs/swagger";

export class CreateTagDto {
  @ApiProperty({
    description: 'Unique tag for blog posts',
    example: 'js'
  })
  public title: string;
}
