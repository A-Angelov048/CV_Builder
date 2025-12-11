import { Request, Response } from "express";
import { createUser, getUser, refreshService } from "../services/authService";
import { IUser } from "../models/user";

export async function registerUser(req: Request<{}, {}, IUser>, res: Response) {
  try {
    const body = req.body;
    const { accessToken, refreshToken } = await createUser(body);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "User registered",
      accessToken,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function login(req: Request<{}, {}, IUser>, res: Response) {
  try {
    const { email, password } = req.body;

    const { accessToken, refreshToken } = await getUser(email, password);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Logged in",
      accessToken,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
}

export const refresh = async (req: Request, res: Response) => {
  try {
    const token: string = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    const accessToken = await refreshService(token);

    res.json({ accessToken });
  } catch (err: any) {
    res.status(403).json({ message: err.message });
  }
};
