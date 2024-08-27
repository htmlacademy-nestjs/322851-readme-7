import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";
import { AuthenticationValidateMessage } from "../authentication-module/authentication.consts";

export class LoginUserDto {
  @ApiProperty({
    description: 'User unique email address',
    example: 'pupkin@mail.com'
  })
  @IsEmail({}, {message: AuthenticationValidateMessage.EmailNotValid})
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty'
  })
  @IsString()
  @Length(6, 12, {message: AuthenticationValidateMessage.PasswordNotValid})
  public password: string;
}
