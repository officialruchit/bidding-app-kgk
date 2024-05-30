const express = require("express");
const router = express.Router();
const notificationController = require("../controller/notificationsController");
const auth = require("../middleware/auth");

router.get("/", auth, notificationController.getNotifications);
router.post("/mark-read", auth, notificationController.markNotificationsAsRead);

module.exports = router;
