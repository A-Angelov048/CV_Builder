import bcrypt from "bcrypt";
import jwt from "../utils/jwt";
import { User, IUser } from "../models/user";
import { jwtData } from "../types/mainTypes";

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
  await createdUser.save();

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
  const test = await User.updateOne(
    { refreshToken: token },
    { $pull: { refreshToken: token } },
  );
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
