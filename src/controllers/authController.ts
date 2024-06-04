import authService from "../services/authService";
import registerValidation from "../validations/authValidation";
import emailService from "../services/emailService";
import { Request, Response } from "express";

const register = async (
  req: Request,
  res: Response
): Promise<void | Response<unknown, Record<string, unknown>>> => {
  try {
    const { error } = registerValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { userName, password, email } = req.body;
    if (userName && password && email) {
      await authService.registerUser(userName, password, email);
      await emailService.sendRegistrationEmail(email, userName);
      res
        .status(200)
        .json("User is succesfully registered.Kindly check your mail");
    } else {
      res.status(404).json("Missing fields in the body");
    }
  } catch {
    (error: Error) => {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    };
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userName, password } = req.body;
    if (userName && password) {
      const token = await authService.loginUser(userName, password);
      res.status(200).json(token);
    } else {
      res.status(404).json("Missing fields in the body");
    }
  } catch {
    (error: Error) => {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    };
  }
};

export default { register, login };
