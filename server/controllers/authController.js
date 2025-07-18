import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const generateToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Register
export const registerUser = async (req, res) => {
  const { name, email, password, isAdmin = false } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    isAdmin,
  });

  const token = generateToken(user._id, user.isAdmin);

  res.cookie("token", token, { httpOnly: true });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "Invalid credentials" });

  const token = generateToken(user._id, user.isAdmin);

  res.cookie("token", token, { httpOnly: true });

  // Redirect logic
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    message: user.isAdmin ? "Redirect to admin dashboard" : "Redirect to user dashboard",
  });
};

// Logout
export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};
