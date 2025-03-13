// PhotoDetail.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PhotoDetail() {
  const { photoId } = useParams();

  // Fetch photo details using the id (or pass the photo info as props)
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

  return (
    <>
 {!isLoading && (
  <div className="min-h-screen bg-gray-100 p-4">
    <div className="max-w-7xl mx-auto bg-white shadow rounded-md overflow-hidden">

      {/* Top Section: Photo (Left) & User Info (Right) */}
      <div className="flex flex-col md:flex-row">

        {/* Left Column: Photo & Description */}
        <div className="w-full md:w-3/4 p-6">
          <h1 className="text-2xl font-bold mb-4">{photo.caption}</h1>
          <div className="mb-6">
            <img
              src={photo.imageUrl}
              alt={photo.caption}
              className="w-full h-auto max-h-[600px] object-cover rounded-md shadow"
            />
          </div>
          <p className="text-gray-700 mb-2">{photo.caption}</p>
        </div>

        {/* Right Column: User Info */}
        <aside className="w-full md:w-1/4 p-6 border-t md:border-t-0 md:border-l border-gray-200">
          {/* User Info */}
          <div className="flex items-center mb-4">
            <img
              src=""
              alt="User avatar"
              className="w-12 h-12 rounded-full mr-3 object-cover"
            />
            <div>
              <p className="font-semibold text-gray-700">John Doe</p>
              <p className="text-sm text-gray-500">Joined 2021</p>
            </div>
          </div>
          {/* Stats */}
          <div className="space-y-2 text-sm text-gray-600">
            {/* <p>
              <span className="font-semibold">Uploaded:</span> {uploadDate}
            </p> */}
            <p>
              <span className="font-semibold">Likes:</span> {photo.likes.length}
            </p>
          </div>
        </aside>
      </div>

      {/* Bottom Section: Comments */}
      <div className="border-t border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Comments ({photo.comments.length})</h2>
        {/* Comment listing here */}
      </div>
    </div>
  </div>
)}

    </>
  );
}

export default PhotoDetail;
