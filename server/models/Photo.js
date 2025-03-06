import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    caption: { type: String },
    createdAt: { type: Date, default: Date.now },
  });
  
  export default mongoose.model("Photo", photoSchema);