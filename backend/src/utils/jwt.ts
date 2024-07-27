import { sign, verify, Secret } from "jsonwebtoken";

const secret: Secret = process.env.JWT_SECRET as Secret;

export function signToken(payload: any): string {
  return sign(payload, secret);
}

export function verifyToken(token: string): any {
  return verify(token, secret);
}
