import { verifyToken } from "../utils/jwt";
import UserModel from "../models/userModel";
import { Request, Response, NextFunction } from "express";
import { User } from "../types/userType";

interface AuthenticatedRequest extends Request {
  user?: User | null;
}

const authentication = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) throw { name: "unauthorized", message: "Authorization Token is missing" };
    const access_token = bearerToken.slice("Bearer ".length);
    console.log(access_token);
    if (!access_token) throw { name: "JsonWebTokenError", message: "Invalid Token" };
    const { id } = verifyToken(access_token);

    const user = await UserModel.findUserById(id);
    console.log(user);

    if (!user) throw { name: "unauthorized", message: "User not authorized" };
    req.user = user as User;
    next();
  } catch (error) {
    next(error);
  }
};
export default authentication;
