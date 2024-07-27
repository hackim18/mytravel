import { Request, Response, NextFunction } from "express";
import ProductModel from "../models/productModel";
import { UserRequest } from "../types/userType";

class ProductController {
  static async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductModel.getAllProducts();
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
  static async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await ProductModel.getProductById(id);
      if (!product) {
        throw { name: "NotFound", message: "Product not found" };
      }
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
  static async getAllProductsByLikeId(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const product = await ProductModel.getAllProductsByLikeId(req.user?.id || "");
      if (product.length === 0) {
        throw { name: "NotFound", message: "Product not found" };
      }
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
  static async likeOrUnlikeProduct(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await ProductModel.getProductById(id);
      if (!product) {
        throw { name: "NotFound", message: "Product not found" };
      }
      const isUserLiked = await ProductModel.findProductByUserLikeId(req.user?.id || "", id);

      if (!isUserLiked) {
        const updatedProduct = await ProductModel.likeProduct(req.user?.id || "", id);
        res.json({ message: "Product liked", updatedProduct });
      } else {
        const updatedProduct = await ProductModel.unlikeProduct(req.user?.id || "", id);
        res.json({ message: "Product unliked", updatedProduct });
      }
    } catch (error) {
      next(error);
    }
  }
  static async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, thumbnail, description, price, stockQuantity } = req.body;
      if (!name || !thumbnail || !description || !price || !stockQuantity) {
        throw { name: "ValidationError", message: "All fields are required" };
      }
      const product = await ProductModel.createProduct(name, thumbnail, description, parseFloat(price), +stockQuantity);
      res.status(201).json({
        message: "Product created successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
  static async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await ProductModel.getProductById(id);
      if (!product) {
        throw { name: "NotFound", message: "Product not found" };
      }
      await ProductModel.deleteProduct(id);
      res.json({ message: "Product deleted successfully", product });
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
