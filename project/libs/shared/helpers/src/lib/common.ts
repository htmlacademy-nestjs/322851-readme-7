import { ClassTransformOptions, plainToInstance } from 'class-transformer';

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T;

export function fillDto<T, V extends []>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T[];

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T | T[] {
  return plainToInstance(DtoClass, plainObject, { excludeExtraneousValues: true, ...options, })
}

export function getMongoDbString({username, password, host, dbName, port, authDb}): string {
  return `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=${authDb}`;
}

export function getRabbitMqConnectionString({user, password, host, port}) {
  return `amqp://${user}:${password}@${host}:${port}`;
}

export function getArrayOfUniques<T>(arr: T[]): T[] {
  const set = new Set(arr);
  return Array.from(set);
}
