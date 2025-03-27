// PhotoDetail.js
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CommentsSection from "../../components/comments-section/CommentsSection";
import useFetchSingle from "../../utils/useFetchSinglePhoto";
import useFetchUserById from "../../hooks/useFetchUserById";
import { useUser } from "../../contexts/userContext";
import axios from "axios";
import DeletePhotoModal from "./DeletePhotoModal";
import ResponsiveImage from "./ResponsiveImage";
import { X } from 'lucide-react';



function PhotoDetail() {
  const [isOwner, setIsOwner] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { photoId } = useParams();
  const { photo, isLoading, setPhoto } = useFetchSingle(photoId);
  const { user } = useFetchUserById(photo?.user);
  const { user: loggedInUser, token } = useUser();
  const [localUser, setLocalUser] = useState(loggedInUser);




  const navigate = useNavigate();

  useEffect(() => {
    setLocalUser(loggedInUser);
  }, [loggedInUser]);




  useEffect(() => {

    if (user?._id === loggedInUser?._id) {
      setIsOwner(true);
    } else {
      setIsOwner(false)
    }

  }, [loggedInUser, user])


  const handleDelete = async (photoId) => {
    if (!photoId) return;

    try {
      await axios.delete(`http://localhost:3000/api/photos/${photoId}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate('/user-gallery');
    } catch (error) {
      console.error(`Cannot delete photo: ${error.message}`);
    }
  };


  if (isLoading) return <p>Loading photo...</p>;
  if (!photo) return <p>Photo not found.</p>;



  const userProfilePicture = user?.profilePicture || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6tWkfCJfejkeaq78A0p6L5CZWFFVwxyz0DA&s';


  return (
    <>
      {!isLoading && (
        <div className="min-h-screen bg-gray-100 p-4">
          <div className="max-w-7xl mx-auto bg-white shadow rounded-md overflow-hidden">


            {/* Top Section: Photo (Left) & User Info (Right) */}
            <div className="flex flex-col md:flex-row">

              {/* Left Column: Photo & Description */}
              <div className="w-full md:w-3/4 p-6 border-b border-gray-200">

                <h1 className="text-2xl font-bold mb-4 flex justify-between items-center">
                  <span>{photo.caption}</span>

                  {/* X Button in the top-right corner */}
                  {isOwner && (
                    <>

                      <X
                        onClick={() => setIsModalOpen(true)}
                        className="cursor-pointer transition-transform duration-200 hover:rotate-90 hover:scale-110 hover:text-red-600"
                      />



                      <DeletePhotoModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onDelete={() => handleDelete(photoId)}
                      />
                    </>
                  )}

                </h1>

                <ResponsiveImage
                  src={photo.imageUrl}
                  alt={photo.caption}
                  photo={photo}
                  photoId={photoId}
                  token={token}
                  currentUserId={localUser?._id}
                  onPhotoUpdate={setPhoto}
                  onUserUpdate={setLocalUser}
                  favorites={localUser?.favorites || []}
                />




                <div className="mt-10"></div>

                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-closed-captioning text-gray-800"></i>
                  <p className="text-gray-700 mb-0">{photo.caption}</p>
                </div>


              </div>


              {/* Right Column: User Info */}
              <aside className="w-full md:w-1/4 p-6 border-t md:border-t-0 md:border-l border-b border-gray-200">

                {/* User Info */}
                <div className="flex items-center mb-4">
                  <img
                    src={userProfilePicture}
                    alt="User avatar"
                    className="w-12 h-12 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-700">{user?.username}</p>
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


            <CommentsSection photo={photo} />


            {/* Bottom Section: Comments */}

            {/* Comment listing here */}
          </div>
        </div>

      )}

    </>
  );
}

export default PhotoDetail;
