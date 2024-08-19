import { ConfigService } from '@nestjs/config';
import { getRabbitMqConnectionString } from './common';

export function getRabbitMqOptions(optionsSpace) {
  return {
    useFactory: async (config: ConfigService) => ({
      exchanges: [{
        name: config.get<string>(`${optionsSpace}.queue`),
        type: 'direct'
        }
      ],
      uri: getRabbitMqConnectionString({
        user: config.get<string>(`${optionsSpace}.user`),
        password: config.get<string>(`${optionsSpace}.password`),
        host: config.get<string>(`${optionsSpace}.host`),
        port: config.get<string>(`${optionsSpace}.port`),
      })
    }),
    inject: [ConfigService]
  }
}
