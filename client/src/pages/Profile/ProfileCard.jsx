import { useContext, useState } from "react";
import { UserContext, useUser } from "../../contexts/userContext";

export default function ProfileCard() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); // Default profile image

  const { user, token } = useUser();

  const profilePicture = user?.profilePicture || "https://i.pravatar.cc/300"; // Fallback image if no profile picture

  
  

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

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
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Try again.");
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

            {file && (
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
            <h2 className="text-xl font-semibold text-blue-600 mb-4">About Me</h2>
            <p className="text-gray-700 mb-6">
              Passionate software developer with 5 years of experience in web technologies. 
              I love creating user-friendly applications and solving complex problems.
            </p>

            {/* Skills Section */}
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {["JavaScript", "React", "Node.js", "Python", "SQL"].map((skill) => (
                <span
                  key={skill}
                  className="bg-indigo-100 text-blue-600 px-3 py-1 rounded-full text-sm transition-colors duration-300 hover:bg-blue-900 hover:text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
