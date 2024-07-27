import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../utils/bcrypt";
import { User } from "../types/userType";

const prisma = new PrismaClient();

class UserModel {
  static async createUser(name: string, email: string, password: string): Promise<User> {
    return (await prisma.user.create({
      data: { name, email, password: hashPassword(password) },
    })) as User;
  }
  static async findUserById(id: string): Promise<User> {
    return (await prisma.user.findUnique({
      where: { id },
    })) as User;
  }
  static async findUserByEmail(email: string): Promise<User> {
    return (await prisma.user.findUnique({
      where: { email },
    })) as User;
  }
}

export default UserModel;
