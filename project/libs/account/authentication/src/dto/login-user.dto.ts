import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty({
    description: 'User unique email address',
    example: 'pupkin@mail.com'
  })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty'
  })
  public password: string;
}
