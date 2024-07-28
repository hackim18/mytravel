import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface OrderItemInput {
  productId: string;
  quantity: number;
}

class OrderModel {
  static async createOrder(userId: string, items: OrderItemInput[]) {
    const order = await prisma.$transaction(async (tx) => {
      const products = await tx.product.findMany({
        where: { id: { in: items.map((item) => item.productId) } },
      });

      const newOrder = await tx.order.create({
        data: {
          userId,
          status: "PENDING",
          items: {
            create: items.map((item) => {
              const product = products.find((p) => p.id === item.productId);
              if (!product) {
                throw { name: "NotFound", message: "Product not found" };
              }

              return {
                productId: item.productId,
                quantity: item.quantity,
                price: product.price * item.quantity,
              };
            }),
          },
        },
        include: {
          items: true,
        },
      });

      return newOrder;
    });

    return order;
  }
  static async updateOrderStatus(orderId: string, status: "PENDING" | "COMPLETED" | "CANCELED") {
    return await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }
  static async getOrdersByUserId(userId: string) {
    return await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }
  static async getOrderById(orderId: string) {
    return await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }
  static async deleteOrder(orderId: string) {
    return await prisma.order.delete({
      where: { id: orderId },
    });
  }
}

export default OrderModel;
