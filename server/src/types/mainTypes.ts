import { Secret, SignOptions, VerifyOptions } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      username: string;
    }
  }
}

export type jwtData = {
  userId: string;
  username: string;
  email?: string;
  iat: number;
  exp: number;
};

export interface JwtSignData {
  token: {
    userId: string | object;
    username: string;
    email?: string;
  };
  secret: Secret;
  options?: SignOptions;
}

export interface JwtVerifyData {
  token: string;
  secret: Secret;
  options?: VerifyOptions;
}
