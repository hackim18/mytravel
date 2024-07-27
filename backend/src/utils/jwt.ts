import { sign, verify, Secret } from "jsonwebtoken";

const secret: Secret = process.env.JWT_SECRET as Secret;

export function signToken(payload: string): string {
  return sign(payload, secret);
}

export function verifyToken(token: string): object | string {
  return verify(token, secret);
}
