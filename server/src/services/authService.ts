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

  const accessToken = await createAccessToken(createdUser._id.toString());
  const refreshToken = await createRefreshToken(createdUser._id.toString());

  createdUser.refreshToken?.push(refreshToken);
  await createdUser.save();

  return { username: createdUser.username, accessToken, refreshToken };
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

  const accessToken = await createAccessToken(user._id.toString());
  const refreshToken = await createRefreshToken(user._id.toString());

  user.refreshToken?.push(refreshToken);
  await user.save();

  return { username: user.username, accessToken, refreshToken };
};

export const refreshService = async (token: string) => {
  const decoded = (await jwt.verify({
    token,
    secret: process.env.REFRESH_SECRET as string,
  })) as jwtData;

  const user = await User.findById(decoded.userId);
  const isTokenValid = user?.refreshToken?.find((x) => x === token);

  if (!user || !isTokenValid) throw new Error("Unauthorized");

  const accessToken = await createAccessToken(user._id.toString());

  return { username: user.username, accessToken };
};

export const logoutService = async (token: string) => {
  const test = await User.updateOne(
    { refreshToken: token },
    { $pull: { refreshToken: token } }
  );
};

const createAccessToken = (id: string) => {
  return jwt.sign({
    token: { userId: id },
    secret: process.env.JWT_SECRET as string,
    options: { expiresIn: "15m" },
  });
};

const createRefreshToken = (id: string) => {
  return jwt.sign({
    token: { userId: id },
    secret: process.env.REFRESH_SECRET as string,
    options: { expiresIn: "7d" },
  });
};
