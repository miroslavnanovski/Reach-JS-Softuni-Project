import { Link } from "react-router-dom";

export default function GalleryItem(photo){

    const {imageUrl, caption} = photo;

    return (
        <>
         <div>
         <Link to={`/gallery/${photo._id}`}><img src={imageUrl || "/placeholder.jpg"} alt={caption || "No caption"} /></Link>
        </div>
        </>
    )
}