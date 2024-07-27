import { verifyToken } from "../utils/jwt";
import UserModel from "../models/userModel";
import { Response, NextFunction } from "express";
import { UserRequest, UserType } from "../types/userType";

const authentication = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) throw { name: "unauthorized", message: "Authorization Token is missing" };
    const access_token = bearerToken.slice("Bearer ".length);
    if (!access_token) throw { name: "JsonWebTokenError", message: "Invalid Token" };
    const { id } = verifyToken(access_token);

    const user = await UserModel.findUserById(id);

    if (!user) throw { name: "unauthorized", message: "User not authorized" };
    req.user = user as UserType;
    next();
  } catch (error) {
    next(error);
  }
};
export default authentication;
