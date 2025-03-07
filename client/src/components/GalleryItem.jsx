export default function GalleryItem(photo){

    const {imageUrl, caption} = photo;

    return (
        <>
         <div>
         <img src={imageUrl || "/placeholder.jpg"} alt={caption || "No caption"} />
        </div>
        </>
    )
}