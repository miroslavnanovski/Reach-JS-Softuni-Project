import express from "express";
import { upload } from "../middlewares/cloudinary-middleware.js";
import Photo from "../models/Photo.js";
import Auth from "../middlewares/auth-middleware.js";
import User from "../models/User.js";

const photoController = express.Router();

// Upload a photo to Cloudinary
photoController.post("/upload", Auth, upload.single("image"), async (req, res) => {

  console.log("🧾 req.file:", req.file);
console.log("📝 req.body:", req.body);


  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { title, caption } = req.body;
    const imageUrl = req.file.path; // Cloudinary URL

    // Validate required fields
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required." });
    }

    const metadata = {
      size: req.file.size,
      format: req.file.mimetype,
      originalname: req.file.originalname,
    };

    const newPhoto = new Photo({
      user: req.user.userId, // ✅ secure: use userId from token
      imageUrl,
      title,
      caption,
      metadata,
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
    const { userId, count, fetchAll, search } = req.query;

    const query = {};

    // If userId is provided, filter by user
    if (userId) {
      query.user = userId;
    }

    // If search is provided, add a case-insensitive regex for the caption
    if (search) {
      query.caption = { $regex: search, $options: "i" };
    }

    let photosQuery = Photo.find(query).sort({ createdAt: -1 }).populate("user");

    // Limit results unless fetchAll is explicitly true
    if (fetchAll !== "true") {
      const limit = parseInt(count) || 10;
      photosQuery = photosQuery.limit(limit);
    }

    const photos = await photosQuery;

    res.json(photos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch photos" });
  }
});


photoController.get('/count', async (req, res) => {
  try {
    const count = await Photo.countDocuments({});
    res.json({ photoCount: count });
  } catch (error) {
    console.error('Error fetching photo count:', error);
    res.status(500).json({ message: 'Server error' });
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
    const photoId = req.params.photoId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if photo is already in favourites
    const index = user.favorites.indexOf(photoId);

    if (index === -1) {
      user.favorites.push(photoId); // Add to favorites
    } else {
      user.favorites.splice(index, 1); // Remove from favorites
    }

    await user.save();
    res.status(200).json(user);
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

    
    if (!photo.user.equals(req.user.userId)) {
      
      return res.status(403).json({ message: "Unauthorized to delete this photo" });
    }

    await photo.deleteOne(); // Ensure deletion completes

    return res.json({ message: "Photo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting photo!", error });
  }
})

photoController.get('/search', async (req, res) => {
  try {
    const query = req.query.query || '';
    const photos = await Photo.find({
      caption: { $regex: query, $options: 'i' } // case-insensitive
    });

    res.json(photos);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


// DELETE comment
photoController.delete("/:photoId/comments/:commentId", Auth, async (req, res) => {
  const { photoId, commentId } = req.params;
  const userId = req.user.userId;

  try {
    const photo = await Photo.findById(photoId);
    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }

    const comment = photo.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // 🔧 Remove manually
    photo.comments = photo.comments.filter(
      (c) => c._id.toString() !== commentId
    );

    await photo.save();

    return res.status(200).json({
      message: "Comment deleted successfully",
      comments: photo.comments,
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

photoController.put("/:photoId", Auth, async (req, res) => {
  console.log("Incoming update:", req.body);
  console.log("Token user:", req.user);

  try {
    const photo = await Photo.findById(req.params.photoId);
    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }

    if (photo.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    photo.title = req.body.title || photo.title;
    photo.caption = req.body.caption || photo.caption;

    await photo.save();

    res.status(200).json(photo);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});











export default photoController;