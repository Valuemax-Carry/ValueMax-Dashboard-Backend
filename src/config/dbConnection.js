const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dns = require("dns");

dotenv.config();
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const dbConnection = () => {
    const uri = process.env.MONGO_URI;

    if (!uri) {
        console.error("MongoDB Error: MONGO_URI is not defined in .env");
        return;
    }

    mongoose
        .connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 100,
        })
        .then(() => {
            console.log("✅ MongoDB Connected");
        })
        .catch((err) => {
            console.error("MongoDB Error:", err.message);
        });
};

module.exports = dbConnection;