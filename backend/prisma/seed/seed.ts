import { PrismaClient } from "@prisma/client";
import usersData from "./users.json";
import { hashPassword } from "../../src/utils/bcrypt";

const prisma = new PrismaClient();

(async () => {
  try {
    for (const userData of usersData) {
      await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: hashPassword(userData.password),
        },
      });
    }

    console.log("Seeding completed successfully");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await prisma.$disconnect();
  }
})();
