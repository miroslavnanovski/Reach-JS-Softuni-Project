import { useEffect, useState } from "react";
import { useUser } from "../../contexts/userContext";
import Gallery from "./Gallery";

export default function UserGallery() {
    const [userId, setUserId] = useState(null);
    const [photosCount,setPhotosCount] = useState(0);
    const { user } = useUser(); 

    useEffect(() => {
        if (user) {
            setUserId(user?._id); // Set the userId when user data is available
        }
    }, [user]); // Re-run when the `user` object changes

    if (!userId) return <div>Loading...</div>; // Show loading state until userId is set

    const updatePhotosCount = (count) => {
        setPhotosCount(count); // Update the photo count from Gallery
    };

    return (
        <>
    <div className="flex justify-center mb-4">
        <h1 className="text-3xl font-semibold text-center">Your Downloads</h1>
    </div>
    
   

    <div className="flex items-center justify-between px-6">
        <div className="flex items-center space-x-3">
            <img
                src={user.profilePicture}
                alt="User Avatar"
                className="w-12 h-12 rounded-full object-cover"
            />
            <span className="text-lg font-medium">{user.username}</span>
        </div>
        <div className="text-lg text-gray-600">{photosCount} results</div>
    </div>
    <hr className="border-gray-300 my-4" />

    <Gallery userId={userId} onPhotosCountChange={updatePhotosCount} />
</>

    
    );
}