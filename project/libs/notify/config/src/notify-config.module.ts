import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import notifyConfig from "./notify.config";

const ENV_FILE_PATH = './apps/notify/notify.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ENV_FILE_PATH,
      load: [notifyConfig]
    })
  ]
})
export class NotifyConfigModule {}
