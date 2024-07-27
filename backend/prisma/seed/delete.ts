import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

(async () => {
  try {
    await prisma.user.deleteMany({});

    console.log("Data deletion completed successfully");
  } catch (error) {
    console.error("Data deletion failed:", error);
  } finally {
    await prisma.$disconnect();
  }
})();
