import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Welcome to my travel app" });
});

export default app;
