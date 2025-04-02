import { useEffect, useState } from "react";
import { useUser } from "../../contexts/userContext";
import dateFormat from "../../utils/dateFormat"
import axios from "axios";
import { Trash2 } from "lucide-react"
import toast from "react-hot-toast";


export default function SingleComment({ comment, isLast, onDelete, photo }) {
  const [isOwner, setIsOwner] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { user, token } = useUser();
  const URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {

    if (user?._id === comment?.user) {
      setIsOwner(true);
    } else {
      setIsOwner(false)
    }

  }, [comment?.user, user])


  const handleDelete = async () => {

    try {
      await axios.delete(
        `${URL}/api/photos/${photo?._id}/comments/${comment._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Comment deleted");
      if (onDelete) onDelete(comment._id); // Notify parent
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };


  const userProfilePicture = user?.profilePicture || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6tWkfCJfejkeaq78A0p6L5CZWFFVwxyz0DA&s';


  const date = dateFormat(comment.createdAt);

  return (
    <div
      className={`w-full pt-6 border-t border-gray-300 justify-start items-start gap-2.5 inline-flex ${
        isLast ? "pb-8" : ""
      }`}
    >
      <img
        className="w-10 h-10 rounded-full object-cover"
        src={userProfilePicture}
        alt={user?.username}
      />
      <div className="w-full flex-col justify-start items-start gap-3.5 inline-flex relative">
        <div className="w-full justify-start items-start flex-col flex gap-1">
          <div className="w-full justify-between items-center inline-flex">
            <h5 className="text-gray-900 text-sm font-semibold leading-snug">{user?.username}</h5>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-xs font-normal leading-5">{date}</span>
              {isOwner && (
                <button
                  onClick={() => setShowConfirm(true)}
                  className="text-gray-400 hover:text-red-600 transition-all"
                  title="Delete comment"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
          <p className="text-gray-800 text-sm font-normal leading-snug">{comment.text}</p>
        </div>

        {/* Inline Confirm Modal */}
        {showConfirm && (
          <div className="absolute top-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg px-4 py-3 z-10">
            <p className="text-sm text-gray-700 mb-2">Delete this comment?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="text-xs text-red-600 font-semibold hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}