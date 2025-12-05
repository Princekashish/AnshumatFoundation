import jwt, { JwtPayload } from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const EXPIRES_IN = "1d";
export type DecodedUser = {
  id: string;
  email?: string;
} & JwtPayload;

export const generateToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
};

export const verifyToken = (token: string): DecodedUser => {
  return jwt.verify(token, JWT_SECRET) as DecodedUser;
};