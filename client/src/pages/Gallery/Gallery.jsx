import { useEffect, useRef, useState } from "react";
import GalleryItem from "./GalleryItem";
import Masonry from "react-masonry-css";
import "./Gallery.css"
import axios from "axios";


export default function Gallery({ userId,onPhotosCountChange }) {
    const [photos, setPhotos] = useState([]);

 

    useEffect(() => {

        const getPhotos = async () => {
            try {
              let loadedPhotos;
          
              if (userId) {
                
                const res = await axios.get(`http://localhost:3000/api/photos`, {
                  params: {
                    userId: userId,
                    fetchAll: true,
                  },
                });
                loadedPhotos = res.data; 

              } else {

                const res = await axios("http://localhost:3000/api/photos?fetchAll=true", {
                  method: "GET",
                });
                loadedPhotos = await res.data;
              }
          
              setPhotos(loadedPhotos);
              onPhotosCountChange(loadedPhotos.length);
            } catch (error) {
              console.error("Error loading photos:", error);
            }
          };
          
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



  
    
    