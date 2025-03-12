import { useState } from "react";
import decodeToken from "../utils/decodeToken";
import { useNavigate } from "react-router-dom";


export default function UploadButton() {
    const [file,setFile] = useState(null);
    const [description, setDescription] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState("");
    const [uploadStatus, setUploadStatus] = useState(""); // "success" | "error"
    const [showModal, setShowModal] = useState(false);
    const [progress, setProgress] = useState(0); 

    const userId = decodeToken();
    const navigate = useNavigate();
  

    const handleFileChange = (e) => {
      setFile(e.target.files[0]); // Store the selected file
    };

    const handleDescriptionChange = (e) => {
      setDescription(e.target.value); // Store the description
    };

    const simulateProgress = () => {
      let fakeProgress = 0;
      const interval = setInterval(() => {
        if (fakeProgress >= 100) {
          clearInterval(interval);
          setUploadMessage("Upload successful!");
          setUploadStatus("success");
          setIsUploading(false);
        } else {
          fakeProgress += Math.floor(Math.random() * 15); // Increment progress (you can adjust this speed)
          setProgress(fakeProgress);
        }
      }, 100); // Speed of progress increment (adjust the delay as needed)
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if(!userId){
        console.log('User is not logged in!');
        return;
      }
      
      if (!file || !description) {
        alert('Please fill out all fields');
        return;
      }

      setIsUploading(true);
      setUploadMessage("Uploading...");
      setUploadStatus("");
      setProgress(0)
      setShowModal(true);

      simulateProgress();
  
      const formData = new FormData();
      formData.append('image', file);
      formData.append('caption', description);
      formData.append('userId', userId); 
      
  
      try {
        const response = await fetch('http://localhost:3000/api/photos/upload', {
          method: 'POST',
          headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Send token in the Authorization header
      },
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error(result.message || "Error uploading file");
        }

        setTimeout(() => {
          setUploadMessage("Upload successful!");
          setUploadStatus("success");
        }, 3000);
  
      } catch (error) {
        setUploadMessage(error.message || "Upload failed");
        setUploadStatus("error");
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
    <form onSubmit={handleSubmit} className="w-full py-9 bg-gray-50 rounded-2xl border border-gray-300 gap-3 grid border-dashed">
      <div className="grid gap-1">
        <h2 className="text-center text-gray-400 text-xs leading-4">
          PNG, JPG or PDF, smaller than 15MB
        </h2>
      </div>

      <div className="grid gap-2">
        <h4 className="text-center text-gray-900 text-sm font-medium leading-snug">
          Drag and Drop your file here or
        </h4>
        <div className="flex items-center justify-center">
          <label>
            <input type="file" hidden onChange={handleFileChange} />
            <div className="flex w-28 h-9 px-2 flex-col bg-indigo-600 rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">
              Choose File
            </div>
          </label>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 text-center">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows="4"
          className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter a description for the image"
        />
      </div>

      <div className="mt-4 text-center">
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-full">
          Upload
        </button>
      </div>
    </form>

    {/* Modal */}
    
        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center relative">
              {isUploading ? (
                <>
                  {/* Fake Progress Bar */}
                  <div className="relative mb-5 pt-1">
                    <div className="mb-4 flex h-2 overflow-hidden rounded bg-gray-100 text-xs">
                      <div
                        style={{ width: `${progress}%` }}
                        className="bg-indigo-600"
                      ></div>
                    </div>
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <div className="text-gray-600">Progress</div>
                      <div className="text-gray-600">{progress}%</div>
                    </div>
                  </div>
                  {/* End Fake Progress Bar */}
                </>
              ) : (
                <>
                  <p className={`mt-4 ${uploadStatus === "success" ? "text-green-600" : "text-red-600"}`}>
                    {uploadMessage}
                  </p>
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