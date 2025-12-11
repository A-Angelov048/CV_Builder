import { sign, verify } from "jsonwebtoken";
import { User, IUser } from "../models/user";
import bcrypt from "bcrypt";

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

  const accessToken = createAccessToken(createdUser._id.toString());
  const refreshToken = createRefreshToken(createdUser._id.toString());

  createdUser.refreshToken = refreshToken;
  await createdUser.save();

  return { accessToken, refreshToken };
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

  const accessToken = createAccessToken(user._id.toString());
  const refreshToken = createRefreshToken(user._id.toString());

  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};

export const refreshService = async (token: string) => {
  const decoded: any = verify(token, process.env.REFRESH_SECRET as string);

  const user = await User.findById(decoded.userId);
  if (!user || user.refreshToken !== token) throw new Error("Unauthorized");

  const accessToken = createAccessToken(user._id.toString());

  return accessToken;
};

const createAccessToken = (userId: string) => {
  return sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (userId: string) => {
  return sign({ userId }, process.env.REFRESH_SECRET as string, {
    expiresIn: "7d",
  });
};
