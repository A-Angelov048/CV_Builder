import util from "util";
import jwt from "jsonwebtoken";

const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify);

module.exports = { sign, verify };
