import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export async function toHash(password: string) {
  const salt = randomBytes(8).toString('hex');
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;

  return `${buf.toString('hex')}.${salt}`;
}

export async function comparePassword(stored: string, supplied: string) {
  const [hashed, salt] = stored.split('.');
  const buf = (await scryptAsync(supplied, salt, 64)) as Buffer;

  return buf.toString('hex') === hashed;
}
