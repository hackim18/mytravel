import { Request, Response, NextFunction } from "express";
import { Error } from "../types/errorType";

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  let statusCode: number = 500;
  let errorMessage: string = "Internal Server Error";
  console.log({ errorCode: err.code });
  console.log({ errorName: err.name });
  console.log({ errorMessage: err.message });
  switch (err.name) {
    case "ValidationError":
      statusCode = 400;
      errorMessage = err.message || "Validation Error";
      break;
    case "BadRequest":
      statusCode = 400;
      errorMessage = err.message || "Bad Request";
      break;
    case "Unauthorized":
      statusCode = 401;
      errorMessage = err.message || "Unauthorized";
      break;
    case "NotFound":
      statusCode = 404;
      errorMessage = err.message || "Not Found";
      break;
    case "Forbidden":
      statusCode = 403;
      errorMessage = err.message || "You're not authorized";
      break;
    case "BSONError":
      statusCode = 400;
      errorMessage = err.message || "Invalid ObjectId";
      break;
    case "AuthenticationError":
      statusCode = 401;
      errorMessage = err.message || "Invalid email or password";
      break;
    case "PrismaClientValidationError":
      statusCode = 400;
      errorMessage = err.message || "Validation Error";
      break;
    case "PrismaClientKnownRequestError":
      switch (err.code) {
        case "P2002":
          statusCode = 400;
          errorMessage = "Email already exists";
          break;
      }
      break;
    default:
      statusCode = 500;
      errorMessage = "Internal Server Error";
  }
  res.status(statusCode).json({ error: errorMessage });
}

export default errorHandler;
