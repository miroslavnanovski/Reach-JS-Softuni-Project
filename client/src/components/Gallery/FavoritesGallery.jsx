import { useEffect, useState } from "react";
import { useUser } from "../../contexts/userContext";
import FavoritesCarousel from "./FavoritesCarousel";
import axios from "axios";

export default function FavoritesGallery(){
    const [favorites,setFavorites] = useState([]);
    const [loading,setLoading] = useState(true);
    const { user } = useUser();
    const userId = user?._id
    
    const URL = import.meta.env.VITE_API_BASE_URL;
    

    useEffect(() => {
        if (user) {
            const fetchFavoritePhotos = async () => {
                try {
                    const res = await axios.get(`${URL}/api/user/${userId}/favorites/`);
                    const photos = await res.data;
                    setFavorites(photos);
                    setLoading(false)
                } catch (error) {
                    console.error('Error fetching favorite photos:', error);
                }
            };
    
            fetchFavoritePhotos(); 
        }
    }, [user]);
    

    

    return (
        <>
        <FavoritesCarousel favorites={favorites} loading={loading}/>
        </>
    )

}