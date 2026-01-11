import jwt, { SignOptions, VerifyOptions, Secret } from "jsonwebtoken";

interface JwtSignData {
  token: {
    userId: string | object;
  };
  secret: Secret;
  options?: SignOptions;
}

interface JwtVerifyData {
  token: string;
  secret: Secret;
  options?: VerifyOptions;
}

function sign({ token, secret, options = {} }: JwtSignData): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(token, secret, options, (err, encoded) => {
      if (err) {
        return reject(err);
      }

      resolve(encoded as string);
    });
  });
}

function verify({
  token,
  secret,
  options = {},
}: JwtVerifyData): Promise<object> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, options, (err, encoded) => {
      if (err) {
        return reject(err);
      }

      resolve(encoded as object);
    });
  });
}

export default {
  sign,
  verify,
};
