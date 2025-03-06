import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import photoRoutes from "./routes/photoController.js";
import authController from "./routes/authController.js";



const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/photo_gallery', {
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

connectDB();




dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/photos", photoRoutes);
app.use("/api/auth", authController);

// Simple test route
app.get("/", (req, res) => {
    res.send("Photo Gallery Backend is Running...");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});