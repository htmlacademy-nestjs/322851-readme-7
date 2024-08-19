import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { EmailSubscriberValidationMessage } from '../email-subscriber.consts';

export class CreateSubscriberDto {
  @ApiProperty({
    description: 'Email of the subscriber',
    example: 'example@example.gav'
  })
  @IsEmail({}, {message: EmailSubscriberValidationMessage.EmailNotValid})
  public email: string;

  @ApiProperty({
    description: 'Name of the subscriber',
    example: 'Ivan Ivanov'
  })
  @IsString()
  @IsNotEmpty({message: EmailSubscriberValidationMessage.EmptyName})
  public name: string;


}
