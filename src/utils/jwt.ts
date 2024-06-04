import jwt, { JwtPayload } from "jsonwebtoken";

// require("dotenv").config();
import dotenv from "dotenv";

dotenv.config();

const generateToken = (userId: number, userName: string): Promise<string> => {
  const payload = {
    id: userId,
    name: userName,
  };
  return jwt.sign(payload, process.env.secret_key, { expiresIn: "1h" });
};

const verifyToken = (token: string): Promise<JwtPayload> => {
  return jwt.verify(token, process.env.secret_key);
};
export default { generateToken, verifyToken };
