import { useEffect, useState } from "react";
import GalleryItem from "./GalleryItem";
import Masonry from "react-masonry-css";
import "./Gallery.css"

export default function Gallery({ userId,onPhotosCountChange }) {
    const [photos, setPhotos] = useState([]);
 

    useEffect(() => {

        const getPhotos = async () => {

            const url = userId
                ? `http://localhost:3000/api/photos?userId=${userId}`
                : "http://localhost:3000/api/photos";

            const res = await fetch(url , {
                method: "GET"
            });

            const loadedPhotos = await res.json();
               

            setPhotos(loadedPhotos);
            onPhotosCountChange(loadedPhotos.length);


        }
        getPhotos();
    
        
    }, [userId, onPhotosCountChange])

    const breakpointColumns = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };
    

    
    return (
        <>
        <div className="max-w-screen-2xl mx-auto p-6">
            <Masonry  
            breakpointCols={breakpointColumns}
            className="flex gap-4" // Horizontal gap
            columnClassName="masonry-column">
            
            {photos.map((photo) => (
                <GalleryItem key={photo._id} {...photo} />
            ))}
        </Masonry>
        </div>
        </>
    )
}



  
    
    