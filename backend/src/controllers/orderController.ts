import { Request, Response, NextFunction } from "express";
import { UserRequest } from "../types/userType";
import OrderModel from "../models/orderModel";

class OrderController {
  static async createOrder(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id || "";
      const items = req.body.items;

      if (!Array.isArray(items) || items.length === 0) {
        throw { name: "ValidationError", message: "Items are required" };
      }

      const order = await OrderModel.createOrder(userId, items);

      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }
  static async getOrdersByUserId(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id || "";
      const orders = await OrderModel.getOrdersByUserId(userId);

      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
  static async updateOrderStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderId } = req.params;
      const { status } = req.body;

      if (!status) {
        throw { name: "ValidationError", message: "Status is required" };
      }

      const validStatus = ["PENDING", "COMPLETED", "CANCELED"];
      if (!validStatus.includes(status)) {
        throw { name: "ValidationError", message: "Invalid status" };
      }

      const findOrder = await OrderModel.getOrderById(orderId);
      if (!findOrder) {
        throw { name: "NotFound", message: "Order not found" };
      }

      const order = await OrderModel.updateOrderStatus(orderId, status);

      res.json(order);
    } catch (error) {
      next(error);
    }
  }
  static async deleteOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderId } = req.params;
      const order = await OrderModel.getOrderById(orderId);

      if (!order) {
        throw { name: "NotFound", message: "Order not found" };
      }

      await OrderModel.deleteOrder(orderId);

      res.json({ message: "Order deleted" });
    } catch (error) {
      next(error);
    }
  }
}
export default OrderController;
