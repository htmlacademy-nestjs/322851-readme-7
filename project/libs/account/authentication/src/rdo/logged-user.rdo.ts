import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'Unique user ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Unique user ID',
    example: '2121656AHGDg'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User access token',
    example: '=bfhgjfgytfvSAGDfgsh2344'
  })
  @Expose()
  public accessToken: string;

  @ApiProperty({
    description: 'User refresh token',
    example: '=bfhgjfgytfvSAGDfgsh2344'
  })
  @Expose()
  public refreshToken: string;
}
