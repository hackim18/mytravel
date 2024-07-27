import { Request } from "express";

export interface UserType {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRequest extends Request {
  user?: UserType | null;
}
