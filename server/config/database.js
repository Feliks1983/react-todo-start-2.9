const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI не найден в .env");
}
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  try {
    if (mongoose.connection.readyState === 1) {
      return { connected: true, db: mongoose.connection.db };
    }

    await mongoose.connect(uri, {
      dbName: "todoapp",
    });
    isConnected = mongoose.connections[0].readyState === 1;
    console.log("Connected to MongoDB!");
    console.log("Database:", mongoose.connection.name);

    return { connected: true, db: mongoose.connection.db };
  } catch (error) {
    console.error("Connection error:", error);
    return { connected: false, error: error.message };
  }
}

module.exports = { connectDB };
