import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import ApiError from "../error/ApiError";

export default function (roles: string | any[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return next(ApiError.forbidden("User is not logged in"));
      }
      const { role: userRoles } = jwt.verify(token, process.env.JWT_SECRET);

      let hasRole = false;
      userRoles.forEach((role: string) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        return next(ApiError.unauthorized("You dont have access"));
      }

      next();
    } catch (err) {
      return next(ApiError.forbidden("User is not logged in"));
    }
  };
}
