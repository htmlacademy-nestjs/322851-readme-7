import { ClassTransformOptions, plainToInstance } from 'class-transformer';

export type DateTimeUnit = 's' | 'h' | 'd' | 'm' | 'y';
export type TimeAndUnit = { value: number; unit: DateTimeUnit };

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
  console.log(`amqp://${user}:${password}@${host}:${port}`);
  return `amqp://${user}:${password}@${host}:${port}`;
}

export function getArrayOfUniques<T>(arr: T[]): T[] {
  const set = new Set(arr);
  return Array.from(set);
}

export function parseTime(time: string) {
  const regex = /^(\d+)([smhdmy])/;
  const match = regex.exec(time);

  if (!match) {
    throw new Error(`[parseTime] bad time string ${time}`);
  }

  const [,rawValue, rawUnit] = match;
  const value = parseInt(rawValue, 10);
  const unit = rawUnit as DateTimeUnit;

  if (isNaN(value)) {
    throw new Error('[parseTime] Can\'t parse value count. Value isNaN.')
  }

  return {unit, value}
}
