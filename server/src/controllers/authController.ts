import { Request, Response } from "express";
import {
  createUser,
  getUser,
  logoutService,
  refreshService,
} from "../services/authService";
import { IUser } from "../models/user";

export async function registerUser(req: Request<{}, {}, IUser>, res: Response) {
  try {
    const body = req.body;
    const { userId, username, accessToken, refreshToken } =
      await createUser(body);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      userId,
      username,
      accessToken,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function login(req: Request<{}, {}, IUser>, res: Response) {
  try {
    const { email, password } = req.body;

    const { userId, username, accessToken, refreshToken } = await getUser(
      email,
      password,
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      userId,
      username,
      accessToken,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function logout(req: Request, res: Response) {
  const token: string = req.cookies.refreshToken;

  if (token) {
    await logoutService(token);
  }

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.json({ message: "Logged out" });
}

export const refresh = async (req: Request, res: Response) => {
  try {
    const token: string = req.cookies.refreshToken;
    if (!token)
      return res.status(401).json({ message: "Required a refresh token" });

    const { userId, username, accessToken } = await refreshService(token);

    res.json({
      userId,
      username,
      accessToken,
    });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};
