const express = require("express");
const { Login, Logout, Me } = require("../controllers/auth");
const limiter = require("../utils/limiter");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/login", limiter, Login);
router.post("/logout", limiter, Logout);
router.get("/me", limiter, authMiddleware, Me);

module.exports = router;