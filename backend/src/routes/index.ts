import express, { Request, Response } from "express";
import UserController from "../controllers/userController";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send({ message: "Welcome to my travel app" });
});

router.post("/register", UserController.register);
router.post("/login", UserController.login);

export default router;
