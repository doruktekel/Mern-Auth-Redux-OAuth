import { hashPassword } from "../helpers/password.js";
import UserModel from "../models/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const alreadyUser = await UserModel.findOne({ email });
  if (alreadyUser) {
    return next(errorHandler(409, "Conflict Error"));
  }

  const hashedPassword = await hashPassword(password);

  try {
    await UserModel.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: "Registration was succesfully" });
  } catch (error) {
    next(error);
  }
};

export { signup };
