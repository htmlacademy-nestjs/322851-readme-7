import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import applicationConfig from './configurations/app.config';
import mongoConfig from './configurations/mongo.config';
import jwtConfig from './configurations/jwt.config';
import rabbitConfig from './configurations/rabbit.config';

const ENV_FILE_PATH = 'apps/account/account.env';

@Module({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        cache: true,
        envFilePath: ENV_FILE_PATH,
        load: [applicationConfig, mongoConfig, jwtConfig, rabbitConfig],
      })
    ]
  })
export class AccountConfigModule {}
