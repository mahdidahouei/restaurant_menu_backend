const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

exports.login = async (email, password) => {
  const admin = await Admin.findOne({ email });
  if (!admin) throw new Error("Invalid email");

  const isPasswordMatch = await bcrypt.compare(password, admin.password);
  if (!isPasswordMatch) throw new Error("Invalid email or password.");

  const accessToken = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
    expiresIn: "3h",
  });
  // const refreshToken = jwt.sign(
  //   { adminId: admin._id },
  //   process.env.JWT_SECRET,
  //   {
  //     expiresIn: "45d",
  //   }
  // );

  return { accessToken };
};
