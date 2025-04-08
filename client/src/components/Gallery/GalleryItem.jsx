import { Link } from "react-router-dom";

export default function GalleryItem(photo){

    const {imageUrl, caption} = photo;



    return (
        <>
         <div>
         <Link to={`/gallery/${photo._id}`}>
         <img
         loading="lazy"
         className="w-full h-auto rounded-lg object-cover"
         src={imageUrl || "/placeholder.jpg"}
         alt={caption || "No caption"}/>
         </Link>
        </div>
        </>
    )
}