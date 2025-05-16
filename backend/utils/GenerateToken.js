const jwt = require("jsonwebtoken");
module.exports.GenerateToken = (user) => {
  try {
    return jwt.sign({ email: user.email }, process.env.JWT_SECRET, {expiresIn: '1h'});
  } catch (err) {
    console.log("Unable to generate token", err);
    return null;
  }
};
