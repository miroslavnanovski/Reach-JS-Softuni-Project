import { useEffect, useState, useCallback } from "react";

export default function useFetchSingle(photoId) {
  const [photo, setPhoto] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const URL = import.meta.env.VITE_API_BASE_URL;


  const fetchPhoto = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${URL}/api/photos/${photoId}`);
      if (!res.ok) throw new Error("Failed to fetch photo");

      const loadedPhoto = await res.json();
      setPhoto(loadedPhoto);
    } catch (error) {
      console.error("Error fetching photo:", error);
    } finally {
      setIsLoading(false);
    }
  }, [photoId]);

  useEffect(() => {
    if (photoId) {
      fetchPhoto();
    }
  }, [photoId, fetchPhoto]);

  return { photo, isLoading, setPhoto };
}
