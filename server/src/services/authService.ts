import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from "../utils/jwt";

import { User } from "../models/user";
import { PortfolioModel } from "../models/portfolio";
import { jwtData } from "../types/mainTypes";
import { IUser } from "../types/userTypes";

export const createUser = async (body: IUser) => {
  const [username, email] = await Promise.all([
    User.findOne({ username: body.username }),
    User.findOne({ email: body.email }),
  ]);

  if (!!username) {
    throw new Error("Username already exists!");
  }

  if (!!email) {
    throw new Error("Email already exists!");
  }
  const hashed = await bcrypt.hash(body.password, 12);
  const createdUser = await User.create({
    username: body.username,
    email: body.email,
    password: hashed,
  });

  const accessToken = await createAccessToken(
    createdUser._id.toString(),
    createdUser.username,
  );
  const refreshToken = await createRefreshToken(
    createdUser._id.toString(),
    createdUser.username,
  );

  createdUser.refreshToken.push(refreshToken);

  Promise.all([
    await createdUser.save(),
    await PortfolioModel.create({
      owner: createdUser._id,
      isPublished: false,
    }),
  ]);

  return {
    userId: createdUser._id.toString(),
    username: createdUser.username,
    accessToken,
    refreshToken,
  };
};

export const getUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Email or Password invalid.");
  }

  const validatePassword = await bcrypt.compare(password, user.password);

  if (!validatePassword) {
    throw new Error("Email or Password invalid.");
  }

  const accessToken = await createAccessToken(
    user._id.toString(),
    user.username,
  );
  const refreshToken = await createRefreshToken(
    user._id.toString(),
    user.username,
  );

  user.refreshToken.push(refreshToken);
  await user.save();

  return {
    userId: user._id.toString(),
    username: user.username,
    accessToken,
    refreshToken,
  };
};

export const refreshService = async (token: string) => {
  const decoded = (await jwt.verify({
    token,
    secret: process.env.REFRESH_SECRET as string,
  })) as jwtData;

  const user = await User.findById(decoded.userId);

  if (!user) throw new Error("Unauthorized");

  const isTokenValid = user.refreshToken.find((x) => x === token);

  if (!isTokenValid) throw new Error("Invalid or expired token");

  const accessToken = await createAccessToken(
    user._id.toString(),
    user.username,
  );

  return { userId: user._id.toString(), username: user.username, accessToken };
};

export const logoutService = async (token: string) => {
  await User.updateOne(
    { refreshToken: token },
    { $pull: { refreshToken: token } },
  );
};

export const changeUserIdentity = async (
  newUsername: string,
  newEmail: string,
  userId: string,
) => {
  const user = await User.findById(userId);

  if (!user || user._id.toString() !== userId) {
    throw new Error("User not found.");
  }

  if (newUsername === user.username) {
    if (newEmail === user.email) {
      throw new Error(
        "The new identity details cannot be the same as the current ones.",
      );
    }
  }

  user.username = newUsername;
  user.email = newEmail;

  const accessToken = await createAccessToken(
    user._id.toString(),
    user.username,
  );

  await user.save();

  return {
    userId: user._id.toString(),
    username: user.username,
    accessToken,
  };
};

export const changeUserPassword = async (
  curPassword: string,
  newPassword: string,
  userId: string,
) => {
  const user = await User.findById(userId);

  if (!user || user._id.toString() !== userId) {
    throw new Error("User not found.");
  }

  const validatePassword = await bcrypt.compare(curPassword, user.password);

  if (!validatePassword) {
    throw new Error("Current password is incorrect.");
  }

  const hashed = await bcrypt.hash(newPassword, 12);

  const accessToken = await createAccessToken(
    user._id.toString(),
    user.username,
  );

  user.password = hashed;
  await user.save();

  return {
    userId: user._id.toString(),
    username: user.username,
    accessToken,
  };
};

export const handleForgottenPassword = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("If an account exists, a reset link has been sent.");
  }

  const resetPasswordToken = await createPasswordResetToken(user.email);

  user.passwordToken = resetPasswordToken;
  await user.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    to: user.email,
    subject: `Password Reset Request`,
    replyTo: user.email,
    html: `
        <h3>Password Reset Request</h3>
        <p>If you have not requested a password reset, please ignore this email.</p>
        <p>You have requested to reset your password. Please click the link below to proceed:</p>
        <a href="${process.env.CLIENT_URL}/reset-password/${user.passwordToken}">Reset Password</a>
      `,
  };

  transporter.sendMail(mailOptions);
};

export const handleResetPassword = async (
  newPassword: string,
  token: string,
) => {
  const decoded = (await jwt.verify({
    token,
    secret: process.env.JWT_SECRET as string,
  })) as jwtData;

  if (!decoded.email) {
    throw new Error("Invalid or expired reset token.");
  }

  const user = await User.findOne({
    passwordToken: token,
    email: decoded.email,
  });

  if (!user) {
    throw new Error("Invalid or expired reset token.");
  }

  const hashed = await bcrypt.hash(newPassword, 12);
  user.password = hashed;
  user.passwordToken = "";
  await user.save();
};

const createAccessToken = (id: string, username: string) => {
  return jwt.sign({
    token: { userId: id, username },
    secret: process.env.JWT_SECRET as string,
    options: { expiresIn: "15m" },
  });
};

const createRefreshToken = (id: string, username: string) => {
  return jwt.sign({
    token: { userId: id, username },
    secret: process.env.REFRESH_SECRET as string,
    options: { expiresIn: "7d" },
  });
};

const createPasswordResetToken = (email: string) => {
  return jwt.sign({
    token: { userId: "", username: "", email },
    secret: process.env.JWT_SECRET as string,
    options: { expiresIn: "15m" },
  });
};
