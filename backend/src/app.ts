import express, { Request, Response } from "express";
import router from "./routes";
import * as dotenv from "dotenv";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(router);
app.use(errorHandler);

export default app;
