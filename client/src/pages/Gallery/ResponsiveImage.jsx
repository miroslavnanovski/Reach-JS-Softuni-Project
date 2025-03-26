import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import axios from "axios";

export default function ResponsiveImage({ src, alt, photo, photoId, token, currentUserId, onPhotoUpdate }) {
  const [isVertical, setIsVertical] = useState(false);
  const [liked, setLiked] = useState(false);

  // Detect orientation
  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    setIsVertical(naturalHeight > naturalWidth);
  };

  // Sync like status when photo or user changes
  useEffect(() => {
    if (photo?.likes && currentUserId) {
      setLiked(photo.likes.includes(currentUserId));
    }
  }, [photo, currentUserId]);
  
  

  const toggleLike = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/photos/${photoId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      const updatedPhoto = response.data;
  
      // Update the parent component’s photo state
      onPhotoUpdate(updatedPhoto);
  
    } catch (error) {
      console.error("Like toggle failed:", error.message);
    }
  };
  


  return (
    <div
      className={`mx-auto rounded-md overflow-hidden ${isVertical ? "w-auto" : "w-full"
        } flex justify-center`}
    >
      <div className="relative group">
        <img
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          className="max-h-[600px] h-auto w-auto max-w-full object-contain transition duration-300"
        />

        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-10 transition duration-300 z-10"></div>

        <button
          onClick={toggleLike}
          className="absolute top-2 right-2 bg-white text-red-600 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 hover:scale-110"
        >
          {liked ? (
            <Heart className="w-5 h-5 fill-red-500 stroke-red-500" />
          ) : (
            <Heart className="w-5 h-5 fill-transparent stroke-red-500" />
          )}

        </button>
      </div>
    </div>
  );
}
