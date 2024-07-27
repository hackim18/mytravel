import express, { Request, Response } from "express";
import { register } from "module";
import UserController from "../controllers/userController";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send({ message: "Welcome to my travel app" });
});

router.post("/register", UserController.register);

export default router;
