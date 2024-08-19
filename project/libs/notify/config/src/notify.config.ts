import { registerAs } from '@nestjs/config'
import * as Joi from 'joi';

const DEFAULT_PORT = 5002;
const DEFAULT_MONGO_PORT = 27017;
const ENVIRONMENTS = ['development', 'production', 'stage'] as const;
const DEFAULT_RABBIT_PORT = 5672;
const DEFAULT_SMTP_PORT = 25;

export interface NotifyConfig {
  environment: string;
  port: number;
  db: {
    host: string;
    port: number;
    user: string;
    password: string;
    name: string;
    authBase: string;
  },
  rabbit: {
    host: string;
    port: number;
    user: string;
    password: string;
    exchange: string;
    queue: string;
  },
  mail: {
    host: string;
    port: number;
    user: string;
    password: string;
    from: string;
  }
}

const validationSchema = Joi.object({
  environment: Joi.string().valid(...ENVIRONMENTS).required(),
  port: Joi.number().port().default(DEFAULT_PORT),
  db: Joi.object({
    host: Joi.string().hostname(),
    port: Joi.number().port().default(DEFAULT_MONGO_PORT),
    user: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    authBase: Joi.string().required(),
  }),
  rabbit: Joi.object({
    host: Joi.string().hostname().required(),
    port: Joi.number().port().default(DEFAULT_RABBIT_PORT),
    user: Joi.string().required(),
    password: Joi.string().required(),
    exchange: Joi.string().required(),
    queue: Joi.string().required(),
  }),
  mail: Joi.object({
    host: Joi.string().hostname().required(),
    port: Joi.number().port().default(DEFAULT_SMTP_PORT),
    user: Joi.string().required(),
    password: Joi.string().required(),
    from: Joi.string().required()
  })
});

function validateConfig(config: NotifyConfig): void {
  const { error } = validationSchema.validate(config, {abortEarly: true});

  if (error) {
    throw new Error(`[Notify config validation error]: ${error.message}`);
  }
}

function getConfig(): NotifyConfig {
  const config: NotifyConfig = {
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10) ?? DEFAULT_PORT,
    db: {
      host: process.env.MONGO_HOST,
      port: parseInt(process.env.MONGO_PORT, 10) ?? DEFAULT_MONGO_PORT,
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
      name: process.env.MONGO_DB,
      authBase: process.env.MONGO_AUTH_BASE
    },
    rabbit: {
      host: process.env.RABBIT_HOST,
      port: parseInt(process.env.RABBIT_PORT, 10) ?? DEFAULT_RABBIT_PORT,
      user: process.env.RABBIT_USER,
      password: process.env.RABBIT_PASSWORD,
      queue: process.env.RABBIT_QUEUE,
      exchange: process.env.RABBIT_EXCHANGE
    },
    mail: {
      host: process.env.RABBIT_HOST,
      port: parseInt(process.env.RABBIT_PORT, 10) ?? DEFAULT_SMTP_PORT,
      user: process.env.RABBIT_USER,
      password: process.env.RABBIT_PASSWORD,
      from: process.env.RABBIT_QUEUE
    }
  }

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);
