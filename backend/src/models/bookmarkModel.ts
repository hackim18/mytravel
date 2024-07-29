import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class BookmarkModel {
  static async createBookmark(userId: string, productId: string) {
    return await prisma.bookmark.create({
      data: {
        userId,
        productId,
      },
    });
  }
  static async getBookmarkByUserId(userId: string) {
    return await prisma.bookmark.findMany({
      where: {
        userId,
      },
      include: {
        product: true,
      },
    });
  }
  static async getBookmarkByProductId(userId: string, productId: string) {
    return await prisma.bookmark.findFirst({
      where: {
        userId,
        productId,
      },
    });
  }
  static async deleteBookmark(userId: string, productId: string) {
    return await prisma.bookmark.deleteMany({
      where: {
        userId,
        productId,
      },
    });
  }
}
export default BookmarkModel;
