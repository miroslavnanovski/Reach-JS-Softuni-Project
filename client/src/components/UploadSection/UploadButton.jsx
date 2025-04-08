import { useState } from "react";
import decodeToken from "../../utils/decodeToken";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useUser } from "../../contexts/userContext";
import { toast } from 'react-hot-toast';
import useUpload from "../../hooks/useUpload";
import UploadModal from "../Gallery/Modals/UploadModal";



export default function UploadButton() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [title, setTitle] = useState('');

  const URL = import.meta.env.VITE_API_BASE_URL;

  const { token } = useUser();
  const decoded = decodeToken(token);
  const userId = decoded?.userId || decoded?.id;

  const {
    isUploading,
    uploadMessage,
    uploadStatus,
    progress,
    uploadPhoto
  } = useUpload(token, "photo-upload");

  if (!userId) {
    console.warn("No valid user ID found in token");
    return null;
  }
  const navigate = useNavigate();


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value); // Store the description
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !title || !description) {
      toast.error("Please fill out all fields");
      return;
    }

    setShowModal(true);

    const result = await uploadPhoto({
      file,
      title,
      caption: description,
      token,
      endpoint: "/api/photos/upload",
      method: "POST",
    })

    if (!result.success) {
      toast.error("Upload failed");
    }
  };


  const changePage = () => {

    setShowModal(false)
    if (uploadMessage === "Upload failed") {
      return null;
    }
    navigate('/gallery')
  }


  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl mx-auto mt-6 p-6 bg-white rounded-2xl shadow-md border border-gray-200"
      >
        <h2 className="text-center text-xl font-semibold text-gray-800 mb-2">Upload a New Photo</h2>
        <p className="text-center text-sm text-gray-500 mb-4">PNG, JPG (max 15MB)</p>

        {/* Image Preview */}
        {previewUrl && (
          <div className="mb-4">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              src={previewUrl}
              alt="Preview"
              className="w-full max-h-64 object-contain rounded-lg"
              style={{ border: "none" }}
            />
          </div>
        )}

        {/* File Input */}
        <div className="mb-4 text-center">
          <label className="inline-block cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full transition">
            Choose File
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              accept="image/*"
            />
          </label>
        </div>

        {/* title area */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a photo title"
            required
          />
        </div>


        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter a description for the image"
          />
        </div>

        {/* Upload Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition font-medium"
          >
            Upload
          </button>
        </div>
      </form>

      {/* Modal */}
      <UploadModal
        show={showModal}
        isUploading={isUploading}
        progress={progress}
        uploadStatus={uploadStatus}
        uploadMessage={uploadMessage}
        onClose={changePage}
      />

    </>
  );
}