import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { getMongoDbString } from '@project/shared-helpers';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => {
      return {
        uri: getMongoDbString({
          username: configService.get<string>('application.user'),
          password: configService.get<string>('application.password'),
          host: configService.get<string>('application.host'),
          port: configService.get<string>('application.port'),
          dbName: configService.get<string>('application.name'),
          authDb: configService.get<string>('application.authBase'),
        })
      }
    },
    inject: [ConfigService]
  }
}
