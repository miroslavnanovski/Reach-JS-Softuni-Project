import { useEffect, useState } from "react";

export default function useFetchSingle(photoId){
    const [photo, setPhoto] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getSinglePhoto = async () => {
          const res = await fetch(`http://localhost:3000/api/photos/${photoId}`, {
            method: "GET",
          });
    
          const loadedPhoto = await res.json();
          setPhoto(loadedPhoto);
          setIsLoading(false);
        };
        getSinglePhoto();
      }, []);

      return {photo,isLoading};
}