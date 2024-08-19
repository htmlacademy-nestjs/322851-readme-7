import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { getMongoDbString } from '@project/shared-helpers';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoDbString({
          username: config.get<string>('application.db.user'),
          password: config.get<string>('application.db.password'),
          host: config.get<string>('application.db.host'),
          dbName: config.get<string>('application.db.name'),
          port: config.get<string>('application.db.port'),
          authDb: config.get<string>('application.db.authBase'),
        }),
      }
    },
    inject: [ConfigService]
  }
}
