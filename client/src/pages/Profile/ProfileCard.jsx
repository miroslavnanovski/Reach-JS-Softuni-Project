import { useEffect, useState } from "react";
import { useUser } from "../../contexts/userContext";
import useFetchMultiplePhotos from "../../hooks/useFetchMultiplePhotos";
import { AnimatePresence, motion } from "framer-motion";


export default function ProfileCard() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [number, setNumber] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const { user, token } = useUser();
  const [description, setDescription] = useState(user?.description || "");

  const photosCount = 5;
  const defaultCover = 'https://images.pexels.com/photos/17052292/pexels-photo-17052292/free-photo-of-scenic-view-of-a-mountain-range.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
  const photos = useFetchMultiplePhotos(photosCount);
  const profilePicture = user?.profilePicture || "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=";

  const URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (photos.length > 0) {
      const randomNumber = Math.floor(Math.random() * photos.length);
      setNumber(randomNumber);
    }
  }, [photos]);

  useEffect(() => {
    if (user?.description) {
      setDescription(user.description);
    }
  }, [user]);

  // ✅ Preview logic with cleanup
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const objectUrl = window.URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => window.URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsUploaded(false);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an image first!");
    if (!token) return alert("You are not authenticated!");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`${URL}/api/user/profile-picture`, {
        method: "PUT",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (response.ok) {
        alert("Profile picture updated successfully!");
        setPreview(data.profilePicture);
        setIsUploaded(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Try again.");
    }
  };

  const handleDescriptionUpdate = async () => {
    if (!token) return alert("You are not authenticated!");

    try {
      const response = await fetch(`${URL}/api/user/description`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Description updated successfully!");
        setIsEditingDescription(false);
      } else {
        alert(data.message || "Failed to update description");
      }
    } catch (error) {
      console.error("Description update error:", error);
      alert("An error occurred. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl"
      >
        <div className="rounded-xl overflow-hidden shadow-xl bg-white bg-opacity-80 backdrop-blur-md text-center">
          {/* Cover + Profile Picture */}
          <div className="relative h-48">
            <img
              src={photos[number]?.imageUrl || defaultCover}
              alt="Cover"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-[-2rem] left-1/2 transform -translate-x-1/2">
              <img
                src={preview || profilePicture}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
              />
            </div>
          </div>

          {/* User Info */}
          <div className="mt-20 px-6 pb-8 pt-4">
            <h1 className="text-2xl font-bold text-gray-800">{user?.username || "Anonymous"}</h1>

            <AnimatePresence mode="wait">
              {isEditingDescription ? (
                <motion.div
                  key="edit"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 border rounded-md mb-3 resize-none"
                    rows="4"
                  />
                  <div className="flex justify-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDescriptionUpdate}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                    >
                      Save
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setDescription(user?.description || "");
                        setIsEditingDescription(false);
                      }}
                      className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-700 mb-3">{description || "No description added yet."}</p>
                  <button
                    onClick={() => setIsEditingDescription(true)}
                    className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit Bio
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Upload Buttons */}
            <div className="mt-8">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition cursor-pointer"
              >
                Select Profile Picture
              </label>
              {file && !isUploaded && (
                <div className="flex justify-center gap-4 mt-4">
                  <button
                    onClick={handleUpload}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                  >
                    Upload
                  </button>
                  <button
                    onClick={() => {
                      setFile(null);
                      setPreview(null);
                    }}
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}