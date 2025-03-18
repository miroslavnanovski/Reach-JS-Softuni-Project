import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetchUserById(userId) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!userId) return; // Prevent API call if userId is null/undefined

    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/${userId}`);
        setUser(response.data?.user || null);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null); // Ensure user remains null on failure
      }
    };

    fetchUser();
  }, [userId]);

  return { user };
}
