import jwt from 'jsonwebtoken';

export function generateToken(userId: string) {
  return jwt.sign({ sub: userId }, 'dev-key-86573');
}

export function verifyToken(token: string) {
  const decoded = jwt.verify(token, 'dev-key-86573');

  if (typeof decoded === 'object' && 'sub' in decoded) {
    return decoded as { [key: string]: any };
  }
  return null;
}
