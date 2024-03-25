import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";

export const signup = async (req, res, next) => {
  const { username, email, password,isAdmin } = req.body;
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    res.status(400).json({ message: "Username or Email already exists" });
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword,isAdmin });

  try {
    await newUser.save();
    res.status(201).json({ message: "User created Successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));

    const validPassword = validUser
      ? bcryptjs.compareSync(password, validUser.password)
      : false;

    if (!validPassword) {
      next(errorHandler(401, "Invalid Username or password"));
    }

    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );

    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000);

    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) { 
    next(error);
  } 
};

export const signout = (req, res) => {
  res.clearCookie("access_token").status(200).json("Signout success !");
};
