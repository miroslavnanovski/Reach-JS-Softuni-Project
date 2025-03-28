import { useEffect, useState } from "react";
import { useUser } from "../../contexts/userContext";
import Gallery from "./Gallery";
import NoContent from "./NoContent";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


export default function UserGallery() {
    const [userId, setUserId] = useState(null);
    const [photosCount, setPhotosCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            setUserId(user?._id);
        }
    }, [user]);

    const updatePhotosCount = (count) => {
        setPhotosCount(count);
        setIsLoading(false);
    };

    if (!userId) return <div>Loading user data...</div>;

    return (
        <>
            {/* Enhanced Top Section */}
            <div className="bg-white shadow-sm rounded-xl px-6 py-6 mb-6 mt-6 mx-4 sm:mx-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    {/* Left: Avatar & Info */}
                    <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                        <Link to={`/${user?._id}/profile`}>
                            <motion.img
                                whileHover={{ scale: 1.1, rotate: 1 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                src={user.profilePicture}
                                alt="User Avatar"
                                className="w-14 h-14 rounded-full object-cover shadow-md"
                            />
                        </Link>

                        <div>
                            <h2 className="text-2xl font-bold">Your Uploads</h2>
                            <p className="text-gray-500 text-sm">by {user.username}</p>
                            <Link
                                to="/favorites"
                                className="text-sm text-blue-600 hover:underline mt-1"
                            >
                                <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                                    <span>⭐️</span>{user.favorites.length} favorite{user.favorites.length !== 1 ? 's' : ''}
                                </p>
                            </Link>
                        </div>
                    </div>

                    {/* Right: Result Count */}
                    <div className="text-gray-600 text-md sm:text-lg">
                        {isLoading ? "Loading..." : `${photosCount} result${photosCount !== 1 ? 's' : ''}`}
                    </div>
                </div>
            </div>

            {/* Gallery Section */}
            <Gallery userId={userId} onPhotosCountChange={updatePhotosCount} />
        </>
    );
}
