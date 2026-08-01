const express = require("express");
const router = express.Router();
const limiter = require("../utils/limiter");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const {createProducts} = require("../controllers/products");

router.post("/create-product", limiter, upload.single("productImage"), createProducts);

module.exports = router;