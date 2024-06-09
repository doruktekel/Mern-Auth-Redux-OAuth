import { strict } from "assert";
import { comparePassword, hashPassword } from "../helpers/password.js";
import UserModel from "../models/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

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

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const compare = await comparePassword(password, user.password);
    if (!compare) {
      return next(errorHandler(401, "Wrong credentials"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "30d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    const { password: _, ...rest } = user._doc;
    // const { password: psw, ...rest } = user.toObject()  // same way _:nothing _doc & to Object convert to js object for th user mongoose model
    //or you can give the general way email : user.email vb...
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const google = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user_id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "30d",
      });
      const { password: _, ...rest } = user._doc;
      res
        .status(200)
        .json(rest)
        .cookie("token", token, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
          sameSite: "strict",
        });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await hashPassword(generatedPassword);
      const { name, email, photo } = req.body;

      const newUser = new UserModel({
        username:
          name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email,
        password: hashedPassword,
        profilePicture: photo,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "30d",
      });
      const { password: _, ...rest } = newUser._doc;
      res
        .cookie("token", token, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
          sameSite: "strict",
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export { signup, signin, google };
