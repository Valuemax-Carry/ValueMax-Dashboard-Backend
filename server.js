const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnection = require("./src/config/dbConnection");
const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");

dotenv.config();
const app = express();
const PORT = process.env.PORT;

//Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://admin-dashboard.valuemax.com.pk"],
    credentials: true,
  }),
);
app.use(cookieParser());

//DBConnection
dbConnection();

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

//Server Running
app.listen(PORT, (err) => {
  if (err) {
    console.err("❌❌ Server Disconnected");
  } else {
    console.log(`✅✅ Server Connected at ${PORT}`);
  }
});
