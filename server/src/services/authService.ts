import bcrypt from "bcrypt";
import jwt from "../utils/jwt";

import { Resend } from "resend";
import { User } from "../models/user";
import { PortfolioModel } from "../models/portfolio";
import { jwtData } from "../types/mainTypes";
import { IUser } from "../types/userTypes";

export const createUser = async (body: IUser) => {
  const [usernameProfile, emailProfile, emailPortfolio] = await Promise.all([
    User.findOne({ username: body.username }),
    User.findOne({ email: body.email }),
    PortfolioModel.findOne({ "about.email": body.email }),
  ]);

  if (!!usernameProfile?.username) {
    throw new Error("Username already exists!");
  }

  if (!!emailProfile?.email || !!emailPortfolio?.about.email) {
    throw new Error("Email already exists!");
  }

  const hashed = await bcrypt.hash(body.password, 12);

  const createdUser = await User.create({
    username: body.username,
    email: body.email,
    password: hashed,
  });

  await PortfolioModel.create({
    owner: createdUser._id,
    about: {
      email: body.email,
    },
  });

  const token = await createVerifyToken(createdUser.email);

  createdUser.verificationToken = token;
  await createdUser.save();

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "CV-Builder <noreply@cv-builder.xyz>",
    to: createdUser.email,
    subject: `Welcome to CV-Builder!`,
    html: `
        <h3>Please verify your email address</h3>
        <p>Thanks for registering for an account on CV-Builder! Before we get started, we just need
        to confirm that this is you. Click below to verify your email address</p>
        <a href="${process.env.CLIENT_URL}/verified-email/${createdUser.verificationToken}">Verify Email</a>
        <p>If you have any problems with the verification of the email. Contact the support at email cvbuilder2025@gmail.com</p>
      `,
  });

  return {
    email: createdUser.email,
  };
};

export const getUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Email or Password invalid.");
  }

  if (!user.isEmailVerified) {
    throw new Error("Please verify your email before logging in.");
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

  const token = await createVerifyToken(user.email);

  user.verificationToken = token;
  await user.save();

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "CV-Builder <noreply@cv-builder.xyz>",
    to: user.email,
    subject: `Password Reset Request`,
    html: `
        <h3>Password Reset Request</h3>
        <p>If you have not requested a password reset, please ignore this email.</p>
        <p>You have requested to reset your password. Please click the link below to proceed:</p>
        <a href="${process.env.CLIENT_URL}/reset-password/${user.verificationToken}">Reset Password</a>
      `,
  });
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
    verificationToken: token,
    email: decoded.email,
  });

  if (!user) {
    throw new Error("Invalid or expired reset token.");
  }

  const hashed = await bcrypt.hash(newPassword, 12);
  user.password = hashed;
  user.verificationToken = "";
  await user.save();
};

export const handleEmailVerification = async (token: string) => {
  const decoded = (await jwt.verify({
    token,
    secret: process.env.JWT_SECRET as string,
  })) as jwtData;

  if (!decoded.email) {
    throw new Error("Email is verification failed!");
  }

  const user = await User.findOne({
    verificationToken: token,
    email: decoded.email,
    isEmailVerified: false,
  });

  if (!user) {
    throw new Error("Email is verification failed!");
  }

  user.isEmailVerified = true;
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

const createVerifyToken = (email: string) => {
  return jwt.sign({
    token: { userId: "", username: "", email },
    secret: process.env.JWT_SECRET as string,
    options: { expiresIn: "1h" },
  });
};
