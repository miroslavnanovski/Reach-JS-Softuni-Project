import { useEffect, useState } from "react";
import decodeToken from "./decodeToken";
import axios from "axios";

export default function useFetchUser(token,refetchTrigger) {
  const [user, setUser] = useState(null);
  const [fetched, setFetched] = useState(false);
  const URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
  
    if (!token) {
      console.warn("⚠️ No token present");
      setFetched(true);
      return;
    }
  
    let decoded;
    try {
      decoded = decodeToken(token);
  
    } catch (error) {
      console.error("❌ Token decode failed:", error);
      localStorage.removeItem("Authorization");
      setFetched(true);
      return;
    }
  
    const { userId } = decoded;
    if (!userId) {
      console.warn("⚠️ No userId in token");
      setFetched(true);
      return;
    }
  
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${URL}/api/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        setUser(res.data.user);
      } catch (err) {
        console.error("❌ Error fetching user:", err);
      } finally {
        setFetched(true);
      }
    };
  
    fetchUser();
  }, [token, refetchTrigger]);
  

  return { user, fetched };
}
