const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { FetchUser } = require("../middleware/FetchUser");
const {
  RegisterUser,
  LoginUser,
  LogoutUser,
  finduser,
} = require("../Controller/AuthController");
router.post(
  "/register",
  [
    body("name").isLength({ min: 3 }).withMessage("Enter a valid name"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password")
      .isLength({ min: 7 })
      .withMessage("Password must be of at least 7 characters"),
  ],
  RegisterUser
);

router.post(
  "/Login",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  LoginUser
);
router.get("/Logout", LogoutUser);
router.get("/FetchInfo", FetchUser, finduser);
module.exports = router;
