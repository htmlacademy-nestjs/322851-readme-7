import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";
import { AuthenticationValidateMessage } from "../authentication-module/authentication.consts";

export class UpdateUserDto {

  @ApiProperty({
    description: 'User password',
    example: 'qwerty'
  })
  @IsString()
  @Length(6,12, {message: AuthenticationValidateMessage.PasswordNotValid})
  public password: string;
}
