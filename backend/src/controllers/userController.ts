import { Request, Response, NextFunction } from "express";
import userModel from "../models/userModel";
import { comparePassword } from "../utils/bcrypt";
import { signToken } from "../utils/jwt";

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
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "ValidationError", message: "Email and password are required" };
      }
      const user = await userModel.findUserByEmail(email);
      if (!user) {
        throw { name: "AuthenticationError", message: "Invalid email or password" };
      }
      const isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw { name: "AuthenticationError", message: "Invalid email or password" };
      }
      const access_token = signToken({ id: user.id, email: user.email });
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
