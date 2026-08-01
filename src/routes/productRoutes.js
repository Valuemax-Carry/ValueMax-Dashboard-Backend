const express = require("express");
const router = express.Router();
const limiter = require("../utils/limiter");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const {createProducts, fetchProducts} = require("../controllers/products");

router.post("/create-product", limiter, upload.single("productImage"), createProducts);
router.get("/all-products", fetchProducts)

module.exports = router;