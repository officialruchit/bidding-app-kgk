const express = require("express");
const router = express.Router();
const bidController = require("../controller/bidController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

router.get("/items/:itemId/bids", bidController.getBidsByItemId);
router.post(
  "/items/:itemId/bids",
  auth,

  bidController.placeBid
);

module.exports = router;
