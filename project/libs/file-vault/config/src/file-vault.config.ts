import * as Joi from 'joi';
import { registerAs } from '@nestjs/config'

const DEFAULT_MONGO_PORT = 27017;
const DEFAULT_PORT = 3000;
const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

type Environment = typeof ENVIRONMENTS[number];

export interface FileVaultConfig  {
  environment: string;
  port: number;
  uploadDirectory: string;
  staticRoute: string;
  db: {
    host: string;
    user: string;
    password: string;
    name: string;
    port: number;
    authBase: string;
  }
}

const validationSchema = Joi.object({
  environment: Joi.string().valid(...ENVIRONMENTS).required(),
  port: Joi.number().port().default(DEFAULT_PORT),
  uploadDirectory: Joi.string().required(),
  staticRoute: Joi.string().required(),
  db: Joi.object({
    host: Joi.string().valid().hostname(),
    port: Joi.number().port(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    authBase: Joi.string().required(),
  })
})

function validateConfig(config: FileVaultConfig): void {
  const { error } = validationSchema.validate(config, {abortEarly: true});

  if (error) {
    throw new Error(`[FileVault config validation error]: ${error.message}`);
  }
}

function getConfig(): FileVaultConfig {
  const config: FileVaultConfig = {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT, 10) ?? DEFAULT_PORT,
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
    staticRoute: process.env.SERVE_ROOT,
    db: {
      host: process.env.MONGO_HOST,
      port: parseInt(process.env.MONGO_PORT, 10) ?? DEFAULT_MONGO_PORT,
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
      name: process.env.MONGO_DB,
      authBase: process.env.MONGO_AUTH_BASE,
    }
  }

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);
