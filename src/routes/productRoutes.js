const express = require("express");
const router = express.Router();
const limiter = require("../utils/limiter");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const {createProducts, fetchProducts, fetchProductsByCategory, deleteProducts} = require("../controllers/products");

router.post("/create-product",  authMiddleware, limiter, upload.single("productImage"), createProducts);
router.get("/all-products", fetchProducts);
router.get("/category/:slug", fetchProductsByCategory);
router.delete("/delete-product/:id", authMiddleware, limiter, deleteProducts);

module.exports = router;