import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

const ENV_FILE_PATH = 'apps/account/.env';

@Module({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        cache: true,
        envFilePath: ENV_FILE_PATH,
        load: [],
      })
    ]
  })
export class AccountConfigModule {}
