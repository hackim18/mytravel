import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../utils/bcrypt";
import { UserType } from "../types/userType";

const prisma = new PrismaClient();

class UserModel {
  static async createUser(name: string, email: string, password: string): Promise<UserType> {
    return (await prisma.user.create({
      data: { name, email, password: hashPassword(password) },
      select: {
        name: true,
        email: true,
      },
    })) as UserType;
  }
  static async findUserById(id: string): Promise<UserType> {
    return (await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })) as UserType;
  }
  static async findUserByEmail(email: string): Promise<UserType> {
    return (await prisma.user.findUnique({
      where: { email },
    })) as UserType;
  }
}

export default UserModel;
