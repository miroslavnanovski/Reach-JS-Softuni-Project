import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import photoRoutes from "./controllers/photoController.js";
import authController from "./controllers/authController.js";
import userController from "./controllers/userController.js";
import logCRUDOperations from "./middlewares/log-middleware.js";

// Load environment variables
dotenv.config();

// Use Mongoose for MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

const allowedOrigins = [
  "https://my-test-project-25338.web.app",
  "http://localhost:5173" // for local dev
];

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
app.use(logCRUDOperations);
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

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
