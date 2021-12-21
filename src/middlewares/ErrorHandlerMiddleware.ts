import { NextFunction, Request, Response } from "express";
import ApiError from "../error/ApiError";

export default function (err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ApiError) {
    return res.status(err.code).json({ message: err.message });
  }
}
