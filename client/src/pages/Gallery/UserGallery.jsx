import { useEffect, useState } from "react";
import { useUser } from "../../contexts/userContext";
import Gallery from "./Gallery";
import NoContent from "./NoContent";

export default function UserGallery() {
    const [userId, setUserId] = useState(null);
    const [photosCount, setPhotosCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true); 
    const { user } = useUser(); 

    useEffect(() => {
        if (user) {
            setUserId(user?._id); // Set userId when user data is available
        }
    }, [user]);

    useEffect(() => {
        // Retrieve saved count from localStorage on mount
        const storedCount = Number(localStorage.getItem("photosCount")) || 0;
        setPhotosCount(storedCount);
        setIsLoading(false); // Stop loading when we have retrieved stored count
    }, []);

    useEffect(() => {
        // Save the updated photosCount to localStorage whenever it changes
        localStorage.setItem("photosCount", photosCount);
    }, [photosCount]);

    // Function to update photos count
    const updatePhotosCount = (count) => {
        setPhotosCount(count);
        setIsLoading(false); // Stop loading when we have data
    };

    if (!userId) return <div>Loading user data...</div>;

    return (
        <>
            <div className="flex justify-center mb-4">
                <h1 className="text-3xl font-semibold text-center">Your Uploads</h1>
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

            {isLoading ? (
                <div className="text-center text-gray-500">Loading photos...</div>
            ) : photosCount > 0 ? (
                <Gallery userId={userId} onPhotosCountChange={updatePhotosCount} />
            ) : (
                <NoContent />
            )}
        </>
    );
}
