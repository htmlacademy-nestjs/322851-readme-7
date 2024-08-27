import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsString, IsNotEmpty, IsMongoId } from 'class-validator';
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

  @ApiProperty({
    description: 'Id of the subscriber',
    example: '669aef3b7eadb26966f3c2cb'
  })
  @IsMongoId()
  public subscriberId: string;

}
