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
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-center text-3xl font-semibold w-full">Your Images</h1>
            </div>
            <div className="flex justify-between">
                <div className="text-left text-lg">{user.username}</div>
                <div className="text-right text-lg">Image Count: {photosCount}</div>
            </div>
            <Gallery userId={userId} onPhotosCountChange={updatePhotosCount} /> 
        </>
    );
}