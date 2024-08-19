import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { resolve } from 'node:path';

export function getMailerAsyncOptions(optionSpace: string): MailerAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        transport: {
          host: config.get<string>(`${optionSpace}.host`),
          port: config.get<number>(`${optionSpace}.port`),
          secure: false,
          auth: {
            user: config.get<string>(`${optionSpace}.user`),
            pass: config.get<string>(`${optionSpace}.password`),
          },
          pool: true
        },
        defaults: {
          from: config.get<string>(`mail.from`),
        },
        template: {
          dir: resolve(__dirname, 'assets'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }
      }
    },
    inject: [ConfigService]
  }
}
