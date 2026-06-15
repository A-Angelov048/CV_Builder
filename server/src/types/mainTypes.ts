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

export interface TurnstileResponse {
  success: boolean;
  "error-codes": string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
  metadata?: {
    interactive: boolean;
  };
  messages?: string[];
}
