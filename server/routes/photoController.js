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
    const userId = req.user.userId;

    const newPhoto = new Photo({user: userId, imageUrl, caption });
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

photoController.post("/:photoId/comment", Auth, async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user.userId;
    const photo = await Photo.findById(req.params.photoId);

    if (!photo) return res.status(404).json({ message: "Photo not found" });

    const comment = { user: userId, text, createdAt: new Date() };
    photo.comments.push(comment);
    await photo.save();

    res.status(201).json(photo);
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
});

photoController.post("/:photoId/like", Auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const photo = await Photo.findById(req.params.photoId);

    if (!photo) return res.status(404).json({ message: "Photo not found" });

    const index = photo.likes.indexOf(userId);

    if (index === -1) {
      photo.likes.push(userId); // Like the photo
    } else {
      photo.likes.splice(index, 1); // Unlike the photo
    }

    await photo.save();
    res.status(200).json(photo);
  } catch (error) {
    res.status(500).json({ message: "Error liking/unliking photo", error });
  }
});

photoController.post("/:photoId/favorite", Auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const photo = await Photo.findById(req.params.photoId);

    if (!photo) return res.status(404).json({ message: "Photo not found" });

    const index = photo.favorites.indexOf(userId);

    if (index === -1) {
      photo.favorites.push(userId); // Add to favorites
    } else {
      photo.favorites.splice(index, 1); // Remove from favorites
    }

    await photo.save();
    res.status(200).json(photo);
  } catch (error) {
    res.status(500).json({ message: "Error adding/removing favorite", error });
  }
});




export default photoController;