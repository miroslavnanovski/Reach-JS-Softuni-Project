import { useEffect, useState } from "react";
import decodeToken from "./decodeToken";
import axios from "axios";

export default function useFetchUser() {
  const [user, setUser] = useState(null);
  const [fetched, setFetched] = useState(false); // <-- New
  const token = localStorage.getItem('Authorization');

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
    
        setFetched(true); // even if no token, we're done
        return;
      }

      const { userId } = decodeToken(token);
      if (!userId) {
      
        setFetched(true);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/api/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data && response.data.user) {
         
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setFetched(true); // Always flip this
      }
    };

    fetchUser();
  }, [token]);

  return { user, fetched };
}
