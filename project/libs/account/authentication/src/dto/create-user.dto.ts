import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique email address',
    example: 'pupkin@mail.com'
  })
  public email: string;

  @ApiProperty({
    description: 'User firstname and lastname',
    example: 'Vasiliy Pupkin'
  })
  public name: string;

  @ApiProperty({
    description: 'User avatar',
    example: 'avatar.jpg'
  })
  public avatar?: string;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty'
  })
  public password: string;
}
