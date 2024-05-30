const express = require("express");
const router = express.Router();
const itemController = require("../controller/itemController");

const auth = require("../middleware/auth");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/", itemController.getAllItems);
router.get("/:id", itemController.getItemById);
router.post("/", auth, upload.single("image"), itemController.createItem);
router.put("/:id", auth, upload.single("image"), itemController.updateItem);
router.delete("/:id", auth, itemController.deleteItem);

module.exports = router;
