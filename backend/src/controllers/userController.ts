import { Request, Response, NextFunction } from "express";
import userModel from "../models/userModel";

class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        throw { name: "ValidationError", message: "Name, email, and password are required" };
      }
      const user = await userModel.createUser(name, email, password);
      res.status(201).json({
        message: "User created successfully",
        data: { name: user.name, email: user.email },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
