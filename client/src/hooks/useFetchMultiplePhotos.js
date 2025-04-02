import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetchMultiplePhotos(count) {
  const [photos, setPhotos] = useState([]);

  const URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const getPhotos = async () => {
      if (!count) return;

      try {
        const res = await axios.get(`${URL}/api/photos?count=${count}`);
        setPhotos(res.data); // Axios stores the response data in `res.data`
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    getPhotos();
  }, [count]);

  return photos;
}
