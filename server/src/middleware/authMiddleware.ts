import { Request, Response, NextFunction } from "express";
import jwt from "../utils/jwt";
import { jwtData } from "../types/mainTypes";

export interface AuthRequest extends Request {
  userId?: string;
}

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const token = authHeader.split(" ")[1] as string;

  try {
    const decoded = (await jwt.verify({
      token,
      secret: process.env.JWT_SECRET as string,
    })) as jwtData;

    req.userId = decoded.userId;

    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}
