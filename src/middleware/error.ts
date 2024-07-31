import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

interface CustomError {
  statusCode?: number;
  code?: number;
  name?: string;
  path?: string;
  keyValue?: any;
  message?: string;
  stack?: string;
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Set default status code and message
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Handle MongoDB CastError
  if (err.name === "CastError") {
    const message = `Resource not found with this id. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Handle MongoDB Duplicate Key Error
  if (err.code === 11000) {
    const message = `Duplicate key ${Object.keys(err.keyValue)[0]} entered`;
    err = new ErrorHandler(message, 400);
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    const message = `Your token is invalid. Please try again later.`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "TokenExpiredError") {
    const message = `Your token has expired. Please try again later.`;
    err = new ErrorHandler(message, 400);
  }

  // Send error response
  res.status(err.statusCode !== undefined ? err.statusCode : 500).json({
    success: false,
    message: err.message,
  });
};

export default errorHandler;
