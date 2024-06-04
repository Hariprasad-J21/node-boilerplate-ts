import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "../utils/jwt";
import logger from "../config/logger";

const registerUser = async (
  userName: string,
  password: string,
  email: string
): Promise<void> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ userName, password: hashedPassword, email });
  } catch {
    (error: Error) => {
      logger.log("error", error);
      throw new Error("Error registering user");
    };
  }
};

const loginUser = async (
  userName: string,
  password: string
): Promise<string> => {
  try {
    const activeUser = await User.findOne({ where: { userName } });
    if (!activeUser) {
      throw new Error("No such user found");
    }
    const isPassword = await bcrypt.compare(password, activeUser.password);
    if (!isPassword) {
      throw new Error("Invalid Credentials");
    }
    const token = jwt.generateToken(activeUser.id, activeUser.userName);
    return token;
  } catch {
    (error: Error) => {
      logger.log("error", error);
      throw new Error("Error logging user");
    };
  }
};
export default { registerUser, loginUser };
