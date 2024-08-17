import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FileVaultConfig } from '.';
import fileVaultConfig from './file-vault.config';

const ENV_FILE_PATH = 'apps/file-vault/file.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ENV_FILE_PATH,
      load: [fileVaultConfig]

    })
  ]
})
export class FileVaultConfigModule {}
