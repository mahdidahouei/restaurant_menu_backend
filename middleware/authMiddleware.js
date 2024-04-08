const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findOne({ _id: decoded.adminId });

    if (!admin) {
      throw new Error();
    }

    req.token = token;
    req.adminId = admin._id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = authMiddleware;
