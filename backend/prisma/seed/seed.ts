import { PrismaClient } from "@prisma/client";
import usersData from "./data/users.json";
import likesData from "./data/likes.json";
import productsData from "./data/products.json";
import ordersData from "./data/orders.json";
import orderItemsData from "./data/orderItems.json";
import wishlistsData from "./data/wishlists.json";

import { hashPassword } from "../../src/utils/bcrypt";

const prisma = new PrismaClient();

(async () => {
  try {
    for (const userData of usersData) {
      await prisma.user.create({
        data: {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          password: hashPassword(userData.password),
        },
      });
    }
    for (const productData of productsData) {
      await prisma.product.create({
        data: productData,
      });
    }
    for (const likeData of likesData) {
      await prisma.like.create({
        data: likeData,
      });
    }

    for (const orderData of ordersData) {
      await prisma.order.create({
        data: orderData,
      });
    }
    for (const orderItemData of orderItemsData) {
      await prisma.orderItem.create({
        data: orderItemData,
      });
    }
    for (const wishlistData of wishlistsData) {
      await prisma.wishlist.create({
        data: wishlistData,
      });
    }

    console.log("Seeding completed successfully");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await prisma.$disconnect();
  }
})();
