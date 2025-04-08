import { createContext, useState, useEffect, useContext } from "react";
import decodeToken from "../utils/decodeToken";
import axios from "axios";

const URL = import.meta.env.VITE_API_BASE_URL;

const UserContext = createContext({
  user: null,
  token: null,
  loading: true,
  loginUser: async () => {},
  logoutUser: () => {},
});

export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("Authorization") || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // Load user on mount
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        setInitialized(true);

        return;
      }

      const decoded = decodeToken(token);
      const userId = decoded?.userId || decoded?.id;

      if (!userId) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${URL}/api/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data?.user) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Auto-fetch user failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    fetchUser();
  }, [token]);

  const loginUser = async (data) => {
    const token = data.token;
    localStorage.setItem("Authorization", token);
    setToken(token);
  
    const decoded = decodeToken(token);
    const userId = decoded?.userId || decoded?.id;
  
    if (!userId) {
      logoutUser();
      return;
    }
  
    try {
      const res = await axios.get(`${URL}/api/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (res.data?.user) {
        setUser(res.data.user); // 🔥 Update immediately
      } else {
        logoutUser();
      }
    } catch (err) {
      console.error("Login fetch user failed:", err);
      logoutUser();
    }
  };
  

  const logoutUser = () => {
    localStorage.removeItem("Authorization");
    setToken(null);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, token, loginUser, logoutUser, loading, setUser, initialized }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
