import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";
import { AuthenticationValidateMessage } from "../lib/authentication.consts";

export class CreateUserDto {

  @ApiProperty({
    description: 'User unique email address',
    example: 'pupkin@mail.com'
  })
  @IsEmail({}, {message: AuthenticationValidateMessage.EmailNotValid})
  public email: string;

  @ApiProperty({
    description: 'User firstname and lastname',
    example: 'Vasiliy Pupkin'
  })
  @IsString()
  @Length(3,50, {message: AuthenticationValidateMessage.NameNotValid})
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
  @IsString()
  @Length(6,12, {message: AuthenticationValidateMessage.PasswordNotValid})
  public password: string;
}
