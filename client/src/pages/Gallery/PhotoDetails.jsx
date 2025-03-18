// PhotoDetail.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentsSection from "../../components/comments-section/CommentsSection";
import useFetchSingle from "../../utils/useFetchSinglePhoto";
import dateFormat from "../../utils/dateFormat";
import useFetchUser from "../../utils/useFetchUser";

function PhotoDetail() {
  const { photoId } = useParams();

  const user = useFetchUser()
  const createdDate = dateFormat(user.createdAt);
  

  // Fetch photo details using the id (or pass the photo info as props)
  const {photo, isLoading} = useFetchSingle(photoId);

  

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
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6tWkfCJfejkeaq78A0p6L5CZWFFVwxyz0DA&s"
              alt="User avatar"
              className="w-12 h-12 rounded-full mr-3 object-cover"
            />
            <div>
              <p className="font-semibold text-gray-700">{user.username}</p>
              <p className="text-sm text-gray-500">{createdDate}</p>
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
        <CommentsSection photo={photo} />
        {/* Comment listing here */}
      </div>
    </div>

)}

    </>
  );
}

export default PhotoDetail;
