import { useEffect, useState } from "react";
import decodeToken from "./decodeToken";
import axios from "axios";

export default function useFetchUser() {
  const [user, setUser] = useState(null);  // Set initial user state to null
  const token = localStorage.getItem('Authorization');

  useEffect(() => {
    // Don't proceed if there's no token in localStorage
    if (!token) return;

    const { userId } = decodeToken(token); // Make sure decodeToken receives a token

    // If no userId, exit early
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/user/${userId}`,
          {
            headers: { "Authorization": `Bearer ${token}` }
          }
        );
        // Ensure the response contains user data
        if (response.data && response.data.user) {
          setUser(response.data.user);
        } else {
          console.error("No user data found in response");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [token]);  // Add token to dependency array

  return user;
}
