import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    imageUrl: { type: String, required: true },
    caption: { type: String },
    createdAt: { type: Date, default: Date.now },
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // List of user IDs who liked the photo
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  });
  
  export default mongoose.model("Photo", photoSchema);