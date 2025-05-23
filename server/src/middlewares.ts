import { NextFunction, Request, Response } from "express";

// Not Found
export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const err = new Error(`Not Found - ${req.originalUrl}`);
  next(err);
}
// Error Handler
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err?.message,
    stack: process.env.NODE_ENV === "production" ? "" : err?.stack,
  });
}
