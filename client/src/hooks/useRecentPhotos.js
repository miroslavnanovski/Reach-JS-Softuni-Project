import { useEffect, useState } from "react";
import axios from "axios";

export default function useRecentPhotos(count = 5) {
  const [photos, setPhotos] = useState([]);

  const URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await axios.get(`${URL}/api/photos?count=${count}`);
        setPhotos(res.data);
      } catch (err) {
        console.error("Failed to fetch recent photos", err);
      }
    };

    fetchRecent();
  }, [count]);

  return photos;
}
