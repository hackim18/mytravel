import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

(async () => {
  try {
    await prisma.bookmark.deleteMany({});
    await prisma.orderItem.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.like.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.user.deleteMany({});

    console.log("Data deletion completed successfully");
  } catch (error) {
    console.error("Data deletion failed:", error);
  } finally {
    await prisma.$disconnect();
  }
})();
