import { useEffect, useState } from "react";
import axios from "axios";
import { Heart, Star } from "lucide-react";

export default function ResponsiveImage({
  src,
  alt,
  photo,
  photoId,
  token,
  currentUserId,
  onPhotoUpdate,
  onUserUpdate,
  favorites,
  isOwner }) {

  const [isVertical, setIsVertical] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const isMobile = window.innerWidth < 768;


  const URL = import.meta.env.VITE_API_BASE_URL;

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
        `${URL}/api/photos/${photoId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedPhoto = response.data;


      onPhotoUpdate(updatedPhoto);

    } catch (error) {
      console.error("Like toggle failed:", error.message);
    }
  };

  const toggleFavorite = async () => {
    try {
      const response = await axios.post(
        `${URL}/api/photos/${photoId}/favorite`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedUser = response.data;

   
      onUserUpdate(updatedUser);

    } catch (error) {
      console.error("Like toggle failed:", error.message);
    }
  };



  return (
    <div
      className={`mx-auto rounded-md overflow-hidden ${isVertical ? "w-auto" : "w-full"
        } flex justify-center`}
    >
      <div
        className="relative group"
        onClick={() => {
          if (isMobile) setShowActions(!showActions);
        }}
        onMouseEnter={() => !isMobile && setShowActions(true)}
        onMouseLeave={() => !isMobile && setShowActions(false)}
      >

        <img
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          className="max-h-[600px] h-auto w-auto max-w-full object-contain transition duration-300"
        />

        

        {currentUserId && !isOwner && (
          <>
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-10 transition duration-300 z-10"></div>
            {/* Favorite Icon - Top Right */}
            <button
              onClick={toggleFavorite}
              className={`absolute top-2 right-2 bg-white rounded-full p-2 shadow-md transition-all duration-300 z-20 hover:scale-110 ${showActions ? "opacity-100" : "opacity-0"}`}

            >
              {favorites.includes(photoId) ? (
                <Star className="w-5 h-5 fill-current text-yellow-400 stroke-yellow-400" />
              ) : (
                <Star className="w-5 h-5 fill-white stroke-yellow-400" />
              )}
            </button>

            <button
              onClick={toggleLike}
              className={`absolute top-2 left-2 bg-white rounded-full p-2 shadow-md transition-all duration-300 z-20 hover:scale-110 ${showActions ? "opacity-100" : "opacity-0"}`}


            >
              {liked ? (
                <Heart className="w-5 h-5 fill-current text-red-500 stroke-red-500" />
              ) : (
                <Heart className="w-5 h-5 fill-white stroke-red-500" />
              )}
            </button>
          </>
        )}

      </div>
    </div>
  );
}
