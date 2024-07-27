import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ProductModel {
  static async getAllProducts() {
    return await prisma.product.findMany({
      include: {
        likes: {
          select: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }
  static async getProductById(id: string) {
    return await prisma.product.findUnique({
      where: { id },
      include: {
        likes: {
          select: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }
  static async getAllProductsByLikeId(id: string) {
    return await prisma.product.findMany({
      where: {
        likes: {
          some: {
            userId: id,
          },
        },
      },
      include: {
        likes: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }
  static async likeProduct(userId: string, productId: string) {
    return await prisma.like.create({
      data: {
        user: { connect: { id: userId } },
        product: { connect: { id: productId } },
      },
    });
  }
  static async unlikeProduct(userId: string, productId: string) {
    return await prisma.like.delete({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
    });
  }
  static async findProductByUserLikeId(userId: string, productId: string) {
    return await prisma.like.findUnique({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
    });
  }
  static async createProduct(name: string, thumbnail: string, description: string, price: number, stockQuantity: number) {
    return await prisma.product.create({
      data: { name, thumbnail, description, price, stockQuantity },
    });
  }
  static async deleteProduct(id: string) {
    return await prisma.product.delete({
      where: { id },
    });
  }
}

export default ProductModel;
