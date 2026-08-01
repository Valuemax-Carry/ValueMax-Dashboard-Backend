const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbConnection = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log("✅ MongoDB Connected");
        })
        .catch((err) => {
            console.error("MongoDB Error:", err.message);
        });
};
