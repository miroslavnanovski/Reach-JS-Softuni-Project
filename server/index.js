import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import photoRoutes from "./controllers/photoController.js";
import authController from "./controllers/authController.js";
import userController from "./controllers/userController.js";

// Load environment variables
dotenv.config();

// Use Mongoose for MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "Photo-Gallery",
    });
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
}

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/photos", photoRoutes);
app.use("/api/auth", authController);
app.use("/api/user", userController);

// Simple test route
app.get("/", (req, res) => {
  res.send("Photo Gallery Backend is Running...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
