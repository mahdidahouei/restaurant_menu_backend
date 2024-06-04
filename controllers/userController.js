// src/controllers/userController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Admin");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT tokens
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.ACCESS_TOKKEN_EXPIRE_TIME,
    });
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKKEN_EXPIRE_TIME,
      }
    );

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error("Login failed:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken: prevRefreshToken } = req.body;

    // Check if refresh token is valid
    const decoded = jwt.verify(prevRefreshToken, process.env.JWT_SECRET);

    // Find user by ID or other identifier in the decoded token
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Generate JWT tokens
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.ACCESS_TOKKEN_EXPIRE_TIME,
    });
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKKEN_EXPIRE_TIME,
      }
    );

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.error("Refresh token failed:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login,
  refreshToken,
};
