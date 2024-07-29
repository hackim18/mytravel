import { Response, NextFunction } from "express";
import Bookmark from "../models/bookmarkModel";
import { UserRequest } from "../types/userType";

class BookmarkController {
  static async createBookmark(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const { productId } = req.body;
      const userId = req.user?.id || "";
      const isBookmarkExist = await Bookmark.getBookmarkByProductId(userId, productId);
      if (isBookmarkExist) {
        res.json({ message: "Product already in bookmark" });
      }
      const bookmark = await Bookmark.createBookmark(userId, productId);
      res.json({ message: "Product added to bookmark", bookmark });
    } catch (error) {
      next(error);
    }
  }
  static async getBookmarkByUserId(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id || "";
      const bookmark = await Bookmark.getBookmarkByUserId(userId);
      res.json(bookmark);
    } catch (error) {
      next(error);
    }
  }
  static async deleteBookmark(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params;
      console.log("🚀 ~ BookmarkController ~ deleteBookmark ~ productId:", productId);
      const userId = req.user?.id || "";
      const bookmark = await Bookmark.deleteBookmark(userId, productId);
      if (bookmark.count === 0) {
        throw { name: "NotFound", message: "Bookmark not found" };
      }
      res.json({ message: "Bookmark deleted" });
    } catch (error) {
      next(error);
    }
  }
}

export default BookmarkController;
