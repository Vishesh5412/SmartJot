const jwt = require("jsonwebtoken");
const UserInfo = require("../models/User-model");

module.exports.FetchUser = async (req, res, next) => {
  try {
    if (!req.cookies.token)
      return res.status(401).json({ message: "User not Logged-In" });
    const { email } = jwt.verify(req.cookies.token, process.env.JWT_SECRET); // Extract email directly
    req.user = await UserInfo.findOne({ email }).select("-password"); // Get user info (excluding password)
    if (!req.user) return res.status(401).json({ message: "User not found" });
    next();
  } catch (err) {
    console.log("Something went wrong", err);
    res.status(500).json({ message: "unable to fetch userinfo" });
  }
};
