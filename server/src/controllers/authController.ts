import { Request, Response } from "express";
import {
  changeUserIdentity,
  changeUserPassword,
  createUser,
  getUser,
  logoutService,
  refreshService,
  handleForgottenPassword,
  handleResetPassword,
  handleEmailVerification,
} from "../services/authService";
import { IUser } from "../types/userTypes";

export async function registerUser(req: Request<{}, {}, IUser>, res: Response) {
  try {
    const body = req.body;
    const { email } = await createUser(body);

    res.json({
      email,
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

export async function forgotPassword(
  req: Request<{}, {}, { email: string }>,
  res: Response,
) {
  const { email } = req.body;

  try {
    await handleForgottenPassword(email);
    res.json({ message: "If an account exists, a reset link has been sent." });
  } catch (err: any) {
    res.status(200).json({ message: err.message });
  }
}

export const resetPassword = async (
  req: Request<{}, {}, { newPassword: string; token: string }>,
  res: Response,
) => {
  const { newPassword, token } = req.body;
  try {
    await handleResetPassword(newPassword, token);
    res.json({ message: "Password updated successfully." });
  } catch (err: any) {
    if (err.message === "jwt expired")
      res.status(400).json({ message: "Invalid or expired reset token." });
    else res.status(400).json({ message: err.message });
  }
};

export const refresh = async (req: Request, res: Response) => {
  const token: string = req.cookies.refreshToken;

  if (!token)
    return res.status(401).json({ message: "Required a refresh token" });

  try {
    const { userId, username, accessToken } = await refreshService(token);

    res.json({
      userId,
      username,
      accessToken,
    });
  } catch (err: any) {
    await logoutService(token);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(401).json({ message: err.message });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const token = req.params.token;

  if (!token)
    return res.status(401).json({ message: "Required a verified token" });

  try {
    await handleEmailVerification(token);
    res.json({
      message: "Email is verified successfully!",
    });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};

export const changeIdentity = async (req: Request, res: Response) => {
  const reqUserId = req.userId;

  try {
    const body = req.body;

    const { userId, username, accessToken } = await changeUserIdentity(
      body.username,
      body.email,
      reqUserId,
    );

    res.json({
      userId,
      username,
      accessToken,
    });
  } catch (err: any) {
    if (err.code === 11000) {
      res
        .status(400)
        .json({ message: "Username or Email is taken from another user." });
    } else {
      res.status(400).json({ message: err.message });
    }
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const reqUserId = req.userId;

  try {
    const body = req.body;

    if (body.newPassword === body.curPassword) {
      throw new Error("New password cannot be the same as the current one.");
    }

    const { userId, username, accessToken } = await changeUserPassword(
      body.curPassword,
      body.newPassword,
      reqUserId,
    );

    res.json({
      userId,
      username,
      accessToken,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
