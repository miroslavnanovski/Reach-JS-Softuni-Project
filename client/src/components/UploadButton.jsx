import { useState } from "react";
import decodeToken from "../utils/decodeToken";


export default function UploadButton() {
    const [file,setFile] = useState(null);
    const [description, setDescription] = useState('');
    const userId = decodeToken();

    const handleFileChange = (e) => {
      setFile(e.target.files[0]); // Store the selected file
    };

    const handleDescriptionChange = (e) => {
      setDescription(e.target.value); // Store the description
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
          throw new Error('Error uploading file');
        }
        
        alert('File uploaded successfully');
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Upload failed');
      }
    };
    

   return (
    <form onSubmit={handleSubmit} className="w-full py-9 bg-gray-50 rounded-2xl border border-gray-300 gap-3 grid border-dashed">
      <div className="grid gap-1">
        <svg className="mx-auto" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* SVG icon goes here */}
        </svg>
        <h2 className="text-center text-gray-400 text-xs leading-4">PNG, JPG or PDF, smaller than 15MB</h2>
      </div>

      <div className="grid gap-2">
        <h4 className="text-center text-gray-900 text-sm font-medium leading-snug">Drag and Drop your file here or</h4>
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
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 text-center">Description</label>
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
   );
}