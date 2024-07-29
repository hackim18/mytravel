import { Request, Response, NextFunction } from "express";
import Wishlist from "../models/wishlistModel";
import { UserRequest } from "../types/userType";

class WishlistController {
  static async createWishlist(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const { productId } = req.body;
      const userId = req.user?.id || "";
      const isWishlistExist = await Wishlist.getWishlistByProductId(userId, productId);
      if (isWishlistExist) {
        res.json({ message: "Product already in wishlist" });
      }
      const wishlist = await Wishlist.createWishlist(userId, productId);
      res.json({ message: "Product added to wishlist", wishlist });
    } catch (error) {
      next(error);
    }
  }
  static async getWishlistByUserId(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id || "";
      const wishlist = await Wishlist.getWishlistByUserId(userId);
      res.json(wishlist);
    } catch (error) {
      next(error);
    }
  }
  static async deleteWishlist(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params;
      console.log("🚀 ~ WishlistController ~ deleteWishlist ~ productId:", productId);
      const userId = req.user?.id || "";
      const wishlist = await Wishlist.deleteWishlist(userId, productId);
      if (wishlist.count === 0) {
        throw { name: "NotFound", message: "Wishlist not found" };
      }
      res.json({ message: "Wishlist deleted" });
    } catch (error) {
      next(error);
    }
  }
}

export default WishlistController;
