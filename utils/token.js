const jwt = require("jsonwebtoken");
require("dotenv").config();
// Generate JWT token
const generateToken = (payload, expiresIn = "1h") => {
  // Replace 'YOUR_SECRET_KEY' with your actual secret key
  const token = jwt.sign(payload, process.env.SECRET, { expiresIn });
  return token;
};

module.exports = { generateToken };
