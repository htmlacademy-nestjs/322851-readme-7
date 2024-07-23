import { ConfigService } from "@nestjs/config";
import { MongooseModuleAsyncOptions } from "@nestjs/mongoose";
import { getMongoDbString } from "@project/shared-helpers";
export { getMongoDbString } from '@project/shared-helpers'

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoDbString({
          username: config.get<string>('db.user'),
          password: config.get<string>('db.password'),
          host: config.get<string>('db.host'),
          dbName: config.get<string>('db.name'),
          port: config.get<string>('db.port'),
          authDb: config.get<string>('db.authBase'),
        })
      }
    },
    inject: [ConfigService]
  }
}
