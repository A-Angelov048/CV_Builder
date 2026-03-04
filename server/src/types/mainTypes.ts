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
  iat: number;
  exp: number;
};
