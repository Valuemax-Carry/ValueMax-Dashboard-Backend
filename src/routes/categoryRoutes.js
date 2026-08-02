const express = require("express");
const router = express.Router();
const limiter = require("../utils/limiter");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const { createCategories, fetchCategories, deleteCategories } = require("../controllers/categories");

router.post("/create-category", authMiddleware, limiter, upload.single("categoryImage"), createCategories);
router.get("/all-categories", fetchCategories);
router.delete("/delete-category/:id", authMiddleware, limiter, deleteCategories);

module.exports = router;