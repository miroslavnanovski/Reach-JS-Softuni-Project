import { createContext, useState, useEffect, useContext } from "react";
import useFetchUser from "../utils/useFetchUser";

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("Authorization") || null);
  const fetchedUser = useFetchUser(token);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (fetchedUser) {
      setUser(fetchedUser);
    }
  }, [fetchedUser]);

  const loginUser = (userData) => {
    setToken(userData.token);
    localStorage.setItem("Authorization", userData.token);
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("Authorization");
  };

  return (
    <UserContext.Provider value={{ user, token, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ Export only one default provider
export { UserContext, UserProvider };
