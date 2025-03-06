import express from "express";
import { upload } from "../middlewares/cloudinary-middleware.js";
import Photo from "../models/Photo.js";
import Auth from "../middlewares/auth-middleware.js";

const photoController = express.Router();

// Upload a photo to Cloudinary
photoController.post("/upload", Auth,  upload.single("image"), async (req, res) => {
  try {
    const { caption } = req.body;
    const imageUrl = req.file.path; // Cloudinary URL

    const newPhoto = new Photo({ imageUrl, caption });
    await newPhoto.save();

    res.status(201).json(newPhoto);
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error });
  }
});

// Get all photos
photoController.get("/", async (req, res) => {
  try {
    const photos = await Photo.find().populate();
    res.json(photos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch photos" });
  }
});

export default photoController;