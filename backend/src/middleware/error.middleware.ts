import type { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger.js";
import { ApiError } from "../utils/ApiError.js";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = error instanceof ApiError ? error.statusCode : 500;
  const message =
    error instanceof ApiError && error.isOperational
      ? error.message
      : "Internal server error";

  logger.error(
    { err: error, method: req.method, path: req.originalUrl, statusCode },
    "Request failed"
  );

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack })
  });
};