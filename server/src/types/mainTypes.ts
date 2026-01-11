declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export type jwtData = {
  userId: string;
  iat: number;
  exp: number;
};
