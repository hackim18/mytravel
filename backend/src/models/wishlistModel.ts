import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class WishlistModel {
  static async createWishlist(userId: string, productId: string) {
    return await prisma.wishlist.create({
      data: {
        userId,
        productId,
      },
    });
  }
  static async getWishlistByUserId(userId: string) {
    return await prisma.wishlist.findMany({
      where: {
        userId,
      },
      include: {
        product: true,
      },
    });
  }
  static async deleteWishlist(userId: string, productId: string) {
    return await prisma.wishlist.deleteMany({
      where: {
        userId,
        productId,
      },
    });
  }
}
export default WishlistModel;
