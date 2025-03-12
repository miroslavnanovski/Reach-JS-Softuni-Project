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
  params: (req, file) => ({
    folder: "photo_gallery", // Cloudinary folder
    allowed_formats: ["jpg", "png", "jpeg"], // Allowed file types
    public_id: `${file.originalname.split('.')[0]}_${uuidv4()}`, // Unique filename using original name + UUID
    use_filename: true, // Keeps the original filename in Cloudinary
    unique_filename: false, // Prevents Cloudinary from renaming the file
    overwrite: false, // Does not overwrite files with the same name
  }),
});

const upload = multer({ storage });

export { cloudinary, upload };