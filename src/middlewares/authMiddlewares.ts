import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default function ({
  req,
  res,
  next,
}: {
  req: {
    method: string;
    headers: { authorization: string };
    user: any;
  };
  res: Response;
  next: NextFunction;
}) {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: 'Пользователь не авторизован' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Пользователь не авторизован' });
  }
}
