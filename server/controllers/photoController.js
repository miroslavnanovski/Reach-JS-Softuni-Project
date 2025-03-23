import express from "express";
import { upload } from "../middlewares/cloudinary-middleware.js";
import Photo from "../models/Photo.js";
import Auth from "../middlewares/auth-middleware.js";

const photoController = express.Router();

// Upload a photo to Cloudinary
photoController.post("/upload", Auth, upload.single("image"), async (req, res) => {
  try {
      
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { caption, userId } = req.body;
    const imageUrl = req.file.path; // Cloudinary URL

    // Metadata available from Multer (size, format, etc.)
    const metadata = {
      size: req.file.size, // File size in bytes
      format: req.file.mimetype, // image/jpeg, image/png, etc.
      originalname: req.file.originalname, // Original file name
    };

    const newPhoto = new Photo({
      user: userId,
      imageUrl, // Use the correct Cloudinary URL
      caption,
      metadata, // Store metadata in the database
    });

    await newPhoto.save();

    res.status(201).json(newPhoto);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});


// Get all photos
photoController.get("/", async (req, res) => {
  try {
    const { userId } = req.query;  // Get userId from query parameters
    let photos;

    if (userId) {
      // If userId is provided, filter photos by the user's ObjectId
      photos = await Photo.find({ user: userId }).populate();
    } else {
      // If no userId is provided, fetch all photos
      photos = await Photo.find().populate();
    }

    res.json(photos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch photos" });
  }
});


photoController.get("/:photoId", async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.photoId); // More efficient
    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }
    res.json(photo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch photo" });
  }
});



photoController.post("/:photoId/comment", Auth, async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user.userId; // Assuming the userId is in the token or session
    console.log(userId);
    
    const photo = await Photo.findById(req.params.photoId);

    if (!photo) return res.status(404).json({ message: "Photo not found" });

    // Create the comment object with the userId, text, and createdAt
    const comment = { user: userId, text, createdAt: new Date() };
    
    // Push the comment into the photo's comments array
    photo.comments.push(comment);
    await photo.save();

    // Send back the updated comments array with the comment's userId included
    res.status(201).json({ comments: photo.comments });
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

photoController.delete("/:photoId/delete", Auth, async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.photoId);
    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }

    // Optional: Ensure the user owns the photo before deleting
    
    if (photo.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this photo" });
    }

    await photo.deleteOne(); // Ensure deletion completes

    return res.json({ message: "Photo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting photo!", error });
  }
})




export default photoController;