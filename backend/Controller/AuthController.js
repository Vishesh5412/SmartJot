const userModel = require("../models/User-model");
const bcrypt = require("bcrypt");
const { GenerateToken } = require("../utils/GenerateToken");
const UserModel = require("../models/User-model");
const { validationResult } = require("express-validator");
module.exports.RegisterUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If validation errors exist, return them
      return res.status(400).json({ errors: errors.array() });
    }
    let ExistingUser = await userModel.findOne({ email: req.body.email });
    if (ExistingUser) {
      return res.status(409).json({ message: "User already exists." });
    }
    //avoid using that earlier syntax -too lengthy to read
    //avoid using two res.json(used to res.send json data) in the same function if both are to be executed
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    let CreateUser = await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });
    await CreateUser.save();
    let JWTtoken = GenerateToken(CreateUser);
    res.cookie("token", JWTtoken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 60 * 60 * 1000,
    }); //here the name of cookie is set as "token"
    const { password, ...userWithoutPassword } = CreateUser._doc;

    return res.status(200).json({
      message: "User created successfully",
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error("Error during user registration:", err);
    res.status(500).json({ message: " Unable to register user" });
  }
};

module.exports.LoginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const RegisteredUser = await userModel.findOne({ email: req.body.email });
    if (!RegisteredUser) {
      return res.status(404).json({ message: "User does not exist." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      RegisteredUser.password
    ); 

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    const JWTtoken = GenerateToken(RegisteredUser);

    res.cookie("token", JWTtoken, {
      httpOnly: true,
      secure: true, // Only in production with HTTPS
      sameSite: "None",
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    //registered user k sath hashed password bhi nhi bhejna hai
    const { password, ...userWithoutPassword } = RegisteredUser._doc;

    return res.status(200).json({
      message: "User logged in successfully",
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error("Error during user login:", err);
    return res.status(500).json({ message: "Unable to login user" });
  }
};

module.exports.LogoutUser = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true, // should be true in production with HTTPS
      sameSite: "None",
    });
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    console.error("Error, unable to logout user:", err);
    return res.status(500).json({ message: "Unable to logout user" });
  }
};

module.exports.finduser = async (req, res) => {
  try {
    let userid = req.user._id;
    const user = await UserModel.findById(userid).select("-password"); //password k alawa sari information
    return res.status(200).json({ message: "User found", user });
  } catch (err) {
    console.log("Something went wrong", err);
    return res.status(500).json({ message: "Unable to find user" });
  }
};
