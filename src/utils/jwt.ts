import {sign, verify} from "jsonwebtoken";
import { JwtPayload } from "./constants";
const secretKey: string = process.env.JWT_SECRET_KEY!;

export const createToken = (username: string) => {
  const payload: JwtPayload = {
    username,
  };
  const token = sign(payload, secretKey, { expiresIn: '1h' });
  return token;
};

export const validateToken = (token: string): boolean => {
  try {
    const isValid = verify(token, secretKey);
    return isValid ? true : false;
  } catch (err) {
    console.log("error in validating token", err);
    return false;
  }
};
