import express from "express";
import User from "../models/User.js"; 
import bcrypt from "bcryptjs";
import Auth from "../middlewares/auth-middleware.js";
import { upload } from "../middlewares/cloudinary-middleware.js";
import Photo from "../models/Photo.js";
import jwt from "jsonwebtoken";


const userController = express.Router();

userController.post("/update-email", Auth, async (req, res) => {
  const { newEmail } = req.body;
  const userId = req.user.userId; // Extracted from the token
    

  if (!newEmail) return res.status(400).json({ message: "New email is required" });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
  
    const emailExists = await User.findOne({ email: newEmail });
    if (emailExists) return res.status(400).json({ message: "Email already in use" });
  
    user.email = newEmail;
    await user.save();
  
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    )
  
    res.json({
      updatedUser: {
        _id: user._id,
        email: user.email,
        username: user.username,
        profilePicture: user.profilePicture,
        favorites: user.favorites,
      },
      token,
    });
  }catch (error) {
    console.error("Update email error:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
  
});

userController.get('/count', async (req, res) => {
  try {
      const count = await User.countDocuments({});
      res.json({ userCount: count });
  } catch (error) {
      console.error('Error fetching user count:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

userController.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User fetched successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});





userController.post("/update-password", Auth, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.userId;
  
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Both current and new password are required" });
    }
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      // Check if the current password is correct
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });
  
      // Hash new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();
  
      res.json({ message: "Password updated successfully"});
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  userController.put("/profile-picture", Auth, upload.single("image"), async (req, res) => {
    try {
        console.log("User ID from Middleware:", req.user); // Debugging
        if (!req.user || !req.user.userId) {
            return res.status(400).json({ message: "User ID missing from request" });
        }

        const userId = req.user.userId; // ✅ This should now work
        const imageUrl = req.file.path;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePicture: imageUrl },
            { new: true }
        );

        res.status(200).json({ message: "Profile picture updated", profilePicture: updatedUser.profilePicture });
    } catch (error) {
        console.error("Error updating profile picture:", error);
        res.status(500).json({ message: "Error updating profile picture", error });
    }
});


userController.put('/description', Auth, async (req, res) => {
  const { description } = req.body;
  const userId = req.user.userId;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { description }, { new: true });
    res.json({ message: "Description updated", description: updatedUser.description });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

userController.get('/:userId/favorites', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const reversedIds = [...user.favorites].reverse(); // newest first

    // Fetch all photos
    const photos = await Photo.find({ _id: { $in: reversedIds } });

    // Sort to match the reversed favorites order
    const photoMap = new Map(photos.map(p => [p._id.toString(), p]));
    const sortedPhotos = reversedIds.map(id => photoMap.get(id.toString())).filter(Boolean);

    res.json(sortedPhotos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

userController.delete('/:userId/delete', Auth, async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await User.findByIdAndDelete(userId);

    if (result) {
      console.log('User deleted successfully');
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting user' });
  }
});





  

export default userController;