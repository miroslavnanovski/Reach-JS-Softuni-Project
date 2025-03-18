import { useState } from "react";

export default function ProfileCard() {

    const [file,setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Store the selected file
      };


    return (
      <div className="bg-gradient-to-r min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full p-8 transition-all duration-300 animate-fade-in">
          <div className="flex flex-col md:flex-row">
            {/* Profile Image & Info */}
            <div className="md:w-1/3 text-center mb-8 md:mb-0">
              <img
                src="https://i.pravatar.cc/300"
                alt="Profile Picture"
                className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-blue-800 transition-transform duration-300 hover:scale-105"
              />
              <h1 className="text-2xl font-bold text-blue-600 mb-2">John Doe</h1>
              <p className="text-gray-600">Software Developer</p>
              <button 
              
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300"
              
              
              >
                Upload profile picture
              </button>
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
