import { useEffect, useState } from "react";
import { useUser } from "../../contexts/userContext";
import Gallery from "./Gallery";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";


export default function UserGallery() {
    const [userId, setUserId] = useState(null);
    const [photosCount, setPhotosCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useUser();
    const [favorites, setFavorites] = useState([]);

    const URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        if (user && user._id) {
            setUserId(user._id); // optionally still set userId if used elsewhere

            const fetchFavoritePhotos = async () => {
                try {
                    const res = await axios.get(`${URL}/api/user/${user._id}/favorites/`);
                    setFavorites(res.data);
                } catch (error) {
                    console.error('Error fetching favorite photos:', error);
                }
            };

            fetchFavoritePhotos();
        }
    }, [user]);

    const updatePhotosCount = (count) => {
        setPhotosCount(count);
        setIsLoading(false);
    };

    if (!userId) return <div>Loading user data...</div>;

    return (
        <>
            {/* Top Section */}
            <div className="bg-white shadow-sm rounded-xl px-6 py-6 mb-6 mt-6 mx-4 sm:mx-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    {/* Left: Avatar & Info */}
                    <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                        <Link to={`/${user?._id}/profile`}>
                            <motion.img
                                whileHover={{ scale: 1.1, rotate: 1 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                src={user.profilePicture || "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="}
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
                                    <span>⭐️</span>
                                    {isLoading
                                        ? 'Loading..'
                                        : `${favorites.length} favorite${favorites.length !== 1 ? 's' : ''}`
                                    }
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

            {!isLoading && photosCount === 0 && (
                <div className="text-center text-gray-500 mt-10">
                    <p className="text-lg font-semibold">No uploads yet.</p>
                    <p className="text-sm text-gray-400">Start by uploading your first photo!</p>
                    <Link
                        to="/upload"
                        className="inline-block mt-4 px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                    >
                        Upload a Photo
                    </Link>
                </div>
            )}
        </>
    );
}
