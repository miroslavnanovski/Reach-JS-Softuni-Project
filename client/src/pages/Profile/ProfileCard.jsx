import { useContext, useEffect, useState } from "react";
import { UserContext, useUser } from "../../contexts/userContext";

export default function ProfileCard() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null)
  const { user, token } = useUser();
  const [isUploaded, setIsUploaded] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState(user?.description || "");




  const profilePicture = user?.profilePicture || "https://i.pravatar.cc/300"; // Fallback image if no profile picture

  useEffect(() => {
    if (user?.description) {
      setDescription(user.description);
    }
  }, [user]);



  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsUploaded(false)

      // Create a URL for preview
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image first!");
      return;
    }

    console.log("Sending token:", token);  // Debugging log

    if (!token) {
      alert("You are not authenticated!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file); // Match the key "image" with your backend

    try {
      const response = await fetch("http://localhost:3000/api/user/profile-picture", {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`, // Include token for authentication
        },
      });

      const data = await response.json();
      if (response.ok) {
        alert("Profile picture updated successfully!");
        setPreview(data.profilePicture); // Update UI with new image URL
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
    if (!token) {
      alert("You are not authenticated!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/user/description", {
        method: "PUT", // or POST depending on your backend
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
    <div className="bg-gradient-to-r min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full p-8 transition-all duration-300 animate-fade-in">
        <div className="flex flex-col md:flex-row">
          {/* Profile Image & Info */}
          <div className="md:w-1/3 text-center mb-8 md:mb-0">
            <img
              src={preview || profilePicture}
              alt="Profile Picture"
              className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-blue-800 transition-transform duration-300 hover:scale-105"
            />
            <h1 className="text-2xl font-bold text-blue-600 mb-2">John Doe</h1>

            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300 cursor-pointer"
            >
              Select Profile Picture
            </label>

            {(file && !isUploaded) && (
              <button
                onClick={handleUpload}
                className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-900 transition-colors duration-300"
              >
                Upload
              </button>
            )}
          </div>

          {/* About & Skills */}
          <div className="md:w-2/3 md:pl-8">

            {isEditingDescription ? (
              <>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border rounded-md mb-2"
                  rows="4"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleDescriptionUpdate}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-900 transition-colors duration-300"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setDescription(user?.description || "");
                      setIsEditingDescription(false);
                    }}
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-blue-600">About Me</h2>
                  <button
                    className="p-2.5 bg-blue-600 rounded-xl hover:rounded-3xl hover:bg-blue-800 transition-all duration-300 text-white"
                    onClick={() => setIsEditingDescription(true)}
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
                  </button>
                </div>

                <p className="text-gray-700 mb-2">{description || "No description yet."}</p>



              </>
            )}


            {/* Skills Section */}
          </div>
        </div>
      </div>
    </div>
  );
}
