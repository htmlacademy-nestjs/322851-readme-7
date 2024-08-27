import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMongoId } from 'class-validator';

export class CreateSubscriptionDto {
  @ApiProperty({
    description: 'Email of the subscriber',
    example: 'Ivan@mail.ru'
  })
  @IsEmail()
  userEmail: string;

  @ApiProperty({
    description: 'Id of the subscription\'s user',
    example: '669aef3b7eadb26966f3c2cb'
  })
  @IsMongoId()
  subscriptionId: string;
}
