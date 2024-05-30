// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authenticateToken = require("../middleware/auth");

// Register a new user
router.post("/register", userController.registerUser);

// Authenticate a user and return a token
router.post("/login", userController.loginUser);

// Get the profile of the logged-in user
router.get("/profile", authenticateToken, userController.getUserProfile);

module.exports = router;
