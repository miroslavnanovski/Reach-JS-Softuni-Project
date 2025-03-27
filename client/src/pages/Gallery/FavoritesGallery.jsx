import { useEffect, useState } from "react";
import { useUser } from "../../contexts/userContext";
import FavoritesCarousel from "./FavoritesCarousel";
import axios from "axios";

export default function FavoritesGallery(){
    const [favorites,setFavorites] = useState([]);
    const { user } = useUser();
    const userId = user?._id
    
    

    useEffect(() => {
        if (user) {
            const fetchFavoritePhotos = async () => {
                try {
                    const res = await axios.get(`http://localhost:3000/api/user/${userId}/favorites/`);
                    const photos = await res.data;
                    setFavorites(photos);
                } catch (error) {
                    console.error('Error fetching favorite photos:', error);
                }
            };
    
            fetchFavoritePhotos(); // 👈 You forgot to call it
        }
    }, [user]);
    

    

    return (
        <>
        <FavoritesCarousel favorites={favorites}/>
        </>
    )

}