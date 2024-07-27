import { hashSync, compareSync } from "bcryptjs";

export function hashPassword(password: string): string {
  return hashSync(password, 10);
}

export function comparePassword(password: string, dbPassword: string): boolean {
  return compareSync(password, dbPassword);
}
