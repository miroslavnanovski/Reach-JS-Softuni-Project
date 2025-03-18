import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";  // Importing UUID for generating unique IDs


dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    // Determine the folder based on the route or request type
    let folder = "photo_gallery"; // Default folder
    if (req.path.includes("profile-picture")) {
      folder = "profile_pictures"; // Separate folder for profile pictures
    }

    return {
      folder,
      allowed_formats: ["jpg", "png", "jpeg"],
      public_id: `${file.originalname.split('.')[0]}_${uuidv4()}`,
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };
  },
});

const upload = multer({ storage });

export { cloudinary, upload };