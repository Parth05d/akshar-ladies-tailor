import User from "../models/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "express-validator";

//REGISTER NEW USER
export const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 11);

  const alreadyUser = await User.findOne({ email });
  if (alreadyUser) {
    return res.status(400).send({ message: "User already exists" });
  }

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  res.status(201).send({ message: "User created successfully" });
};

// LOGIN USER
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const loggedInUser = await User.findOne({ username });
  if (!loggedInUser) {
    return res.status(400).send({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, loggedInUser.password);
  if (!isMatch) {
    return res.status(400).send({ message: "Invalid credentials" });
  }

  const token = await jwt.sign(
    { id: loggedInUser._id, username: loggedInUser.username },
    process.env.JWT_SECRET
  );

  res.status(200).send({
    username: loggedInUser.username,
    email: loggedInUser.email,
    token: token,
  });
};

// UPDATE USER
export const updateUser = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 11);
  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user._id },
    { username, email, password: hashedPassword },
    { new: true }
  );
  res
    .status(200)
    .send({ message: "User updated successfully", data: updatedUser });
};

// GET USER
export const getUser = async (req, res) => {
  const foundUser = await User.findById(req.user._id).select("username email");
  res.status(200).send({ data: foundUser });
};
