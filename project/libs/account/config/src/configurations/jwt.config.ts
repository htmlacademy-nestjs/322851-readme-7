import { registerAs } from '@nestjs/config';
import Joi from 'joi';

export interface JwtConfig {
  jwtAccessTokenSecret: string;
  jwtAccessTokenExpiresIn: string;
  jwtRefreshTokenSecret: string;
  jwtRefreshTokenExpiresIn: string;
}

const validationSchema = Joi.object({
  jwtAccessTokenSecret: Joi.string().required(),
  jwtAccessTokenExpiresIn: Joi.string().required(),
  jwtRefreshTokenSecret: Joi.string().required(),
  jwtRefreshTokenExpiresIn: Joi.string().required()
});

function validateConfig(config: JwtConfig): void {
  const { error } = validationSchema.validate(config, {abortEarly: true})

  if (error) {
    throw new Error(`[Account JWTConfig Validation Error]: ${error.message}`);
  }
}

function getConfig(): JwtConfig {
  const config: JwtConfig = {
    jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtAccessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    jwtRefreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
  }

  validateConfig(config);

  return config;
}

export default registerAs('jwt', getConfig);
