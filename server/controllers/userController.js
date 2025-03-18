import express from "express";
import User from "../models/User.js"; 
import bcrypt from "bcryptjs";
import Auth from "../middlewares/auth-middleware.js";
import { upload } from "../middlewares/cloudinary-middleware.js";

const userController = express.Router();

userController.post("/update-email", Auth, async (req, res) => {
  const { newEmail } = req.body;
  const userId = req.user.userId; // Extracted from the token
    

  if (!newEmail) return res.status(400).json({ message: "New email is required" });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if the email is already in use
    const emailExists = await User.findOne({ email: newEmail });
    if (emailExists) return res.status(400).json({ message: "Email already in use" });

    // Update email
    user.email = newEmail;
    await user.save();

    res.json({ message: "Email updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

userController.get('/:userId', Auth, async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
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
      const userId = req.user.id;
      const imageUrl = req.file.path;
  
      const updatedUser = await User.findByIdAndUpdate(userId, { profilePicture: imageUrl }, { new: true });
  
      res.status(200).json({ message: "Profile picture updated", profilePicture: updatedUser.profilePicture });
    } catch (error) {
      res.status(500).json({ message: "Error updating profile picture", error });
    }
  });
  

export default userController;