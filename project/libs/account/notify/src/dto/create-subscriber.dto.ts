import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { AccountNotifyValidationMessage } from '../notify.consts';

export class CreateSubscriberDto {
  @ApiProperty({
    description: 'Email of the subscriber',
    example: 'example@example.gav'
  })
  @IsEmail({}, {message: AccountNotifyValidationMessage.EmailNotValid})
  public email: string;

  @ApiProperty({
    description: 'Name of the subscriber',
    example: 'Ivan Ivanov'
  })
  @IsString()
  @IsNotEmpty({message: AccountNotifyValidationMessage.EmptyName})
  public name: string;


}
