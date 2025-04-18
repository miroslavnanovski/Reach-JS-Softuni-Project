// PhotoDetail.js
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CommentsSection from "../comments-section/CommentsSection";
import useFetchSingle from "../../utils/useFetchSinglePhoto";
import useFetchUserById from "../../hooks/useFetchUserById";
import { useUser } from "../../contexts/userContext";
import axios from "axios";
import ResponsiveImage from "./ResponsiveImage";
import { X, Pencil } from 'lucide-react';
import ConfirmDeleteModal from "./Modals/ConfirmDeleteModal";
import toast from "react-hot-toast";
import EditModal from "./Modals/EditModal";
import { motion,AnimatePresence } from "framer-motion";



function PhotoDetail() {
  const [isOwner, setIsOwner] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { photoId } = useParams();
  const { photo, isLoading, setPhoto } = useFetchSingle(photoId);
  const { user } = useFetchUserById(photo?.user);
  const { user: loggedInUser, token } = useUser();
  const [localUser, setLocalUser] = useState(loggedInUser);
  const [isDeleted, setIsDeleted] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState(photo.title);
  const [editCaption, setEditCaption] = useState(photo.caption);


  const navigate = useNavigate();


  useEffect(() => {
    if (photo) {
      setEditTitle(photo.title);
      setEditCaption(photo.caption);
    }
  }, [photo]);


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

    const URL = import.meta.env.VITE_API_BASE_URL;

    const toastId = toast.loading("Deleting photo...");

    try {
      await axios.delete(`${URL}/api/photos/${photoId}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      
      setTimeout(() => {
        toast.success("Photo deleted successfully!", { id: toastId });

        
        setTimeout(() => {
          navigate("/gallery");
        }, 600); 
      }, 800); 
    } catch (error) {
      toast.error("Failed to delete photo", { id: toastId });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/photos/${photo._id}`,
        {
          title: editTitle,
          caption: editCaption,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", 
          },
        }
      );

      toast.success("Photo updated!");
      setShowEditModal(false);

      
      photo.title = editTitle;
      photo.caption = editCaption;
    } catch (err) {
      toast.error("Failed to update photo");
    }
  };






  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-gray-600">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500 mb-3"></div>
        <p className="text-lg font-medium">Loading photo...</p>
      </div>
    );
  }

  if (!photo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-gray-500">
        <svg
          className="w-12 h-12 mb-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <p className="text-lg font-medium">Photo not found</p>
        <p className="text-sm text-gray-400">It may have been removed or the link is incorrect.</p>
      </div>
    );
  }

  const openEditModal = () => {
    setEditTitle(photo.title);
    setEditCaption(photo.caption);
    setShowEditModal(true);
  };




  const userProfilePicture = user?.profilePicture || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6tWkfCJfejkeaq78A0p6L5CZWFFVwxyz0DA&s';


  return (
    <>
      {!isLoading && (
        <div className="min-h-screen bg-gray-100 p-4">
          <div className="max-w-7xl mx-auto bg-white shadow rounded-md overflow-hidden">


            {/* Top Section: Photo (Left) & User Info (Right) */}
            <div className="flex flex-col md:flex-row">

              {/* Left Column: Photo & Description */}
              <div className="w-full md:w-3/4 p-6 border-b ju border-gray-200">

                <div className="mb-4 flex justify-between items-start">
                  <h1 className="text-2xl font-bold">{photo.title}</h1>

                  {isOwner && (
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ scale: 1.25, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Pencil
                          onClick={openEditModal}
                          className="w-5 h-5 text-blue-600 cursor-pointer"
                        />
                      </motion.div>

                      <X
                        onClick={() => setIsModalOpen(true)}
                        className="w-5 h-5 text-red-500 cursor-pointer transition-transform duration-200 hover:rotate-90 hover:scale-110"
                      />

                      {/* Modals */}
                      <AnimatePresence>
                      {showEditModal && (
                        <EditModal
                          setShowEditModal={setShowEditModal}
                          handleEditSubmit={handleEditSubmit}
                          editTitle={editTitle}
                          setEditTitle={setEditTitle}
                          editCaption={editCaption}
                          setEditCaption={setEditCaption}
                          imageUrl={photo.imageUrl}
                        />
                      )}
                      </AnimatePresence>

                      <ConfirmDeleteModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onDelete={() => handleDelete(photoId)}
                        title="Are you sure you want to delete this photo?"
                        description="This action cannot be undone. The photo will be permanently removed."
                      />
                    </div>
                  )}
                </div>



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
                  isOwner={isOwner}
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
