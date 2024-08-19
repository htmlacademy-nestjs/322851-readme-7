import { Module } from '@nestjs/common';
import { AuthenticationModule } from '@project/authentication'
import { BlogUserModule } from '@project/blog-user';
import { AccountConfigModule } from '@project/account-config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@project/account-config'
import { AccountNotifyModule } from '@project/account-notify';

@Module({
  imports: [
    BlogUserModule,
    AuthenticationModule,
    AccountConfigModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    ),
    AccountNotifyModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
