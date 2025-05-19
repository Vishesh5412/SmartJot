const jwt = require("jsonwebtoken");
const UserInfo = require("../models/User-model");

module.exports.FetchUser = async (req, res, next) => {
  try {
    // Check if token exists in cookies
    if (!req.cookies.token) {
      console.log("No token found in cookies");
      return res.status(401).json({ message: "User not Logged-In" });
    }

    // Verify and decode the JWT token
    const { email } = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    console.log("Decoded Email:", email);

    // Fetch user info by email
    req.user = await UserInfo.findOne({ email }).select("-password");
    if (!req.user) {
      console.log("User not found with this email:", email);
      return res.status(401).json({ message: "User not found" });
    }

    // Attach user info to request
    next();
  } catch (err) {
    console.log("Something went wrong:", err);
    res.status(500).json({ message: "Unable to fetch user info" });
  }
};
