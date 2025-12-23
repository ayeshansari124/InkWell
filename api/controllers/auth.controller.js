const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const createToken = (id) =>
  jwt.sign({ userId: id }, process.env.JWT_SECRET, { expiresIn: "7d" });

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ error: "All fields are required" });

  const exists = await User.findOne({ email });
  if (exists)
    return res.status(400).json({ error: "Email already exists" });

  const user = await User.create({ name, email, password });

  const token = createToken(user._id);
  res.cookie("token", token, {
  httpOnly: true,
  sameSite: "none",
  secure: true,
});


  res.status(201).json({
    user: { _id: user._id, name: user.name, email: user.email },
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(400).json({ error: "Invalid credentials" });

  const token = createToken(user._id);
 res.cookie("token", token, {
  httpOnly: true,
  sameSite: "none",
  secure: true,
});


  res.json({ message: "Login successful" });
};

exports.logout = (req, res) => {
 res.cookie("token", "", {
  httpOnly: true,
  sameSite: "none",
  secure: true,
  expires: new Date(0),
});
  res.json({ message: "Logged out" });
};
