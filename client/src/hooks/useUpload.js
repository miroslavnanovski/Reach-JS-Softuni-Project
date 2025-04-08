import { useState } from "react";
import axios from "axios";

const useUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [progress, setProgress] = useState(0);

  const URL = import.meta.env.VITE_API_BASE_URL;

  const resetUpload = () => {
    setIsUploading(false);
    setUploadMessage("");
    setUploadStatus("");
    setProgress(0);
  };

  const uploadPhoto = async ({ file, title = "", caption = "", token, endpoint, method = "POST" }) => {
    setIsUploading(true);
    setUploadMessage("Uploading...");
    setUploadStatus("");
    setProgress(0);

    const formData = new FormData();
    formData.append("image", file);
    if (title) formData.append("title", title);
    if (caption) formData.append("caption", caption);

    try {
      const response = await axios({
        method,
        url: `${URL}${endpoint}`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percent);
          }
        },
      });

      setUploadStatus("success");
      setUploadMessage("Upload successful!");
      return { success: true, data: response.data };
    } catch (error) {
      setUploadStatus("error");
      setUploadMessage("Upload failed");
      return { success: false, error };
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isUploading,
    uploadMessage,
    uploadStatus,
    progress,
    uploadPhoto,
    resetUpload
  };
};

export default useUpload;
