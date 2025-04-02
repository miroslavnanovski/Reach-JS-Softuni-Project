import { useState } from "react";
import decodeToken from "../utils/decodeToken";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useUser } from "../contexts/userContext";


export default function UploadButton() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(null);

  const URL = import.meta.env.VITE_API_BASE_URL;

const {token} = useUser();
const decoded = decodeToken(token);
const userId = decoded?.userId || decoded?.id;

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !description) {
      alert("Please fill out all fields");
      return;
    }

    setIsUploading(true);
    setUploadMessage("Uploading...");
    setUploadStatus("");
    setProgress(0);
    setShowModal(true);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", description);
    formData.append("userId", userId);

    try {
      const response = await axios.post(
       `${URL}/api/photos/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setProgress(percent);
            }
          },
        }
      );

      setUploadStatus("success");
      setUploadMessage("Upload successful!");
    } catch (error) {
      setUploadStatus("error");
      setUploadMessage("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const changePage = () => {
    setShowModal(false)
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center relative">
            {isUploading ? (
              <div className="flex flex-col items-center justify-center space-y-4">
                {/* Circular Progress */}
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                    fill="none"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#4f46e5"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * progress) / 100}
                    animate={{
                      strokeDashoffset: 283 - (283 * progress) / 100,
                    }}
                    transition={{ ease: "easeInOut", duration: 0.2 }}
                  />
                </svg>

                {/* Animated Counter */}
                <motion.p
                  key={progress}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-lg font-semibold text-gray-700"
                >
                  {progress}%
                </motion.p>

                <p className="text-sm text-gray-500">Uploading your photo...</p>
              </div>
            ) : (
              <>
                {uploadStatus === "success" ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex flex-col items-center space-y-3"
                  >
                    <svg
                      className="w-16 h-16 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <motion.path
                        d="M5 13l4 4L19 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6 }}
                      />
                    </svg>
                    <p className="text-green-600 font-medium text-lg">{uploadMessage}</p>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center space-y-3"
                  >
                    <svg
                      className="w-16 h-16 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-red-600 font-medium text-lg">{uploadMessage}</p>
                  </motion.div>
                )}

                <button
                  onClick={changePage}
                  className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-md"
                >
                  Close
                </button>

              </>
            )}

          </div>
        </div>
      )}

    </>
  );
}