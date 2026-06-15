import { Request, Response, NextFunction } from "express";
import { verifyTurnstile } from "../utils/verifyTurnstile";

export async function verifyHuman(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { turnstileToken } = req.body;

    if (!turnstileToken) {
      res.status(400).json({
        message: "Human verification required",
      });

      return;
    }

    const isValid = await verifyTurnstile(turnstileToken);

    if (!isValid) {
      res.status(400).json({
        message: "Human verification failed",
      });

      return;
    }

    next();
  } catch (error) {
    next(error);
  }
}
