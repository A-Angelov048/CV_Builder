import jwt from "jsonwebtoken";
import { JwtSignData, JwtVerifyData } from "../types/mainTypes";

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
