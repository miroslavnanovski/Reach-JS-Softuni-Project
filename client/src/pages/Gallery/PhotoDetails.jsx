// PhotoDetail.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentsSection from "../../components/comments-section/CommentsSection";
import useFetchSingle from "../../utils/useFetchSinglePhoto";
import dateFormat from "../../utils/dateFormat";
import useFetchUserById from "../../hooks/useFetchUserById";
import { useUser } from "../../contexts/userContext";


function PhotoDetail() {
  const [isOwner, setIsOwner] = useState(false);
  const { photoId } = useParams();
  const { photo, isLoading } = useFetchSingle(photoId);
  const { user } = useFetchUserById(photo?.user);

  const { user: loggedInUser } = useUser();

  useEffect(() => {

    if (user?._id === loggedInUser?._id) {
      setIsOwner(true);
    } else {
      setIsOwner(false)
    }

  }, [loggedInUser, user])




  console.log(isOwner);


  if (isLoading) return <p>Loading photo...</p>;
  if (!photo) return <p>Photo not found.</p>;

  const createdDate = dateFormat(photo.createdAt);

  const userProfilePicture = user?.profilePicture || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6tWkfCJfejkeaq78A0p6L5CZWFFVwxyz0DA&s';


  return (
    <>
      {!isLoading && (
        <div className="min-h-screen bg-gray-100 p-4">
          <div className="max-w-7xl mx-auto bg-white shadow rounded-md overflow-hidden">

            {/* Top Section: Photo (Left) & User Info (Right) */}
            <div className="flex flex-col md:flex-row">

              {/* Left Column: Photo & Description */}
              <div className="w-full md:w-3/4 p-6">
                <h1 className="text-2xl font-bold mb-4 flex justify-between items-center">
                  <span>{photo.caption}</span>

                  {/* X Button in the top-right corner */}
                  {isOwner && (
                    <button
                    onClick={() => handleDelete(photo.id)} // Add your delete functionality
                    className="text-gray-500 hover:text-gray-800"
                  >
                    X
                  </button>
                  )}
                 
                </h1>

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
                    src={userProfilePicture}
                    alt="User avatar"
                    className="w-12 h-12 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-700">{user?.username}</p>
                    <p className="text-sm text-gray-500">{photo.createdAt}</p>
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
