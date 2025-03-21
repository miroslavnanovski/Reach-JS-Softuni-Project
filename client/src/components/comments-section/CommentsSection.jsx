import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import axios from 'axios';
import SingleComment from "./SingleComments";
import { useUser } from "../../contexts/userContext";


export default function CommentsSection({photo}) {
  const [comments,setComments] = useState([])
  const [newComment,setNewComment] = useState('')
  const { photoId } = useParams();
  const token = localStorage.getItem('Authorization');

  const { user } = useUser();
 
  

  

  useEffect(() => {
  if (photo?.comments?.length > 0) {
    setComments(photo.comments);
  }
}, [photo]); // Only re-run when the photo prop changes

const userProfilePicture = user?.profilePicture || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6tWkfCJfejkeaq78A0p6L5CZWFFVwxyz0DA&s';


  

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };


  const handlePostComment = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/photos/${photoId}/comment`,
        { text: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      // Update comments state with the updated array from API response
      if (response.data.comments) {
        setComments(response.data.comments); // Replace the comments state with the new updated list
      }
  
      setNewComment(""); // Clear the input field after successful submission
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };
   



  return (
    <section className="relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full flex-col justify-start items-start lg:gap-14 gap-7 inline-flex">
          <h2 className="w-full text-gray-900 text-4xl font-bold font-manrope leading-normal">
            Comments
          </h2>
          <div className="w-full flex-col justify-start items-start gap-5 flex">
            <div className="w-full rounded-3xl justify-start items-start gap-3.5 inline-flex">
              <img
                className="w-10 h-10 object-cover"
                src={userProfilePicture}
                alt={user?.username}
              />
              <textarea
                name=""
                rows={5}
                className="w-full px-5 py-3 rounded-2xl border border-gray-300 shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] resize-none focus:outline-none placeholder-gray-400 text-gray-900 text-lg font-normal leading-7"
                placeholder="Write your thoughts here...."
                value={newComment}
                onChange={handleCommentChange}
              />
            </div>
            <button
            onClick={handlePostComment}
             className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 ease-in-out rounded-xl shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
              <span className="px-2 py-px text-white text-base font-semibold leading-relaxed">
                Post your comment
              </span>
            </button>
            <div className="w-full flex-col justify-start items-start gap-8 flex"></div>
          </div>
          </div>
          <div className="w-full flex-col justify-start items-start gap-8 flex">
        {comments.map(comment => 
        <SingleComment
            key={comment._id}
            comment={comment}/>)}
        </div>
      </div>
    </section>

  )
}