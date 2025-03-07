import { useEffect, useState } from "react";
import GalleryItem from "../components/GalleryItem";

export default function Gallery() {
    const [photos, setPhotos] = useState([]);


    useEffect(() => {

        const getPhotos = async () => {
            const res = await fetch("http://localhost:3000/api/photos", {
                method: "GET"
            });

            const loadedPhotos = await res.json();
               

            setPhotos(loadedPhotos);

        }
        getPhotos();
    
        
    }, [])

    useEffect(() => {
        if (photos.length > 0) {
            console.log("Updated state:", photos);
        }
    }, [photos]);
    

    
    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                {photos.length === 0 ? "Loading..." : photos.map((photo) => (
                    <GalleryItem 
                        key={photo._id}
                        {...photo} 
                    />
                ))}
            </div>


        </>
    )
}