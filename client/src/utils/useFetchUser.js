import { useEffect, useState } from "react";
import decodeToken from "./decodeToken";
import axios from "axios";

export default function useFetchUser(){
    const token = localStorage.getItem('Authorization');
    const {userId} = decodeToken();

    
    const [user,setUser] = useState({})

    useEffect(() => {
        if (!userId) return;

        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/user/${userId}`,
                    {
                        headers: { "Authorization": `Bearer ${token}` }
                    }
                );
                setUser(response.data.user); // Update state with actual user data
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();

    },[userId, token])
  

   return user;
    
}