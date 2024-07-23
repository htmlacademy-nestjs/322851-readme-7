import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class UserRdo {
  @ApiProperty({
    description: 'Unique user ID',
    example: '2121656AHGDg'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Unique user ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Unique name',
    example: 'Vasiliy Pupkin'
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'Unique avatar',
    example: 'avatar.jpg'
  })
  @Expose()
  public avatar?: string;

  @ApiProperty({
    description: 'How many people subscribed to that user',
    example: '10'
  })
  @Expose()
  public subscribers_count: number;

  @ApiProperty({
    description: 'The number of post user was created',
    example: '25'
  })
  @Expose()
  public posts_count: number;

  @ApiProperty({
    description: 'Registration date',
    example: '2024-07-17'
  })
  @Expose()
  public createdAt: string;
}
