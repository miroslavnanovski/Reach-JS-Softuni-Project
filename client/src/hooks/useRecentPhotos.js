import { useEffect, useState } from "react";
import axios from "axios";

export default function useRecentPhotos(count = 5) {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/photos?count=${count}`);
        setPhotos(res.data);
      } catch (err) {
        console.error("Failed to fetch recent photos", err);
      }
    };

    fetchRecent();
  }, [count]);

  return photos;
}
