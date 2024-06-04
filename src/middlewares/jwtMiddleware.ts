import jwt from "../utils/jwt";
import logger from "../config/logger";
import { Request, Response, NextFunction } from "express";

type RequestData = {
  id: number;
  name: string;
};

declare module "express" {
  interface Request {
    user?: RequestData; // You can specify the type of 'user' property here
  }
}

const jwtMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json("Unauthorized");
  }

  try {
    const decoded = await jwt.verifyToken(token);
    logger.log("info", decoded);
    if (decoded && typeof decoded === "object") {
      const { id, name } = decoded as RequestData;
      req.user = { id, name };
    }

    next();
  } catch (error) {
    logger.log("error", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

export default jwtMiddleWare;
