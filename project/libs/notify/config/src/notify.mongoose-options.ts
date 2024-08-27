import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { getMongoDbString } from '@project/shared-helpers';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => {
      return {
        uri: getMongoDbString({
          username: configService.get<string>('application.db.user'),
          password: configService.get<string>('application.db.password'),
          host: configService.get<string>('application.db.host'),
          port: configService.get<number>('application.db.port'),
          dbName: configService.get<string>('application.db.name'),
          authDb: configService.get<string>('application.db.authBase'),
        })
      }
    },
    inject: [ConfigService]
  }
}
