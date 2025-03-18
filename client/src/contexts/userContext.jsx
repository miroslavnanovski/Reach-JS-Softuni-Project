import { createContext, useState, useEffect } from "react";
import { useContext } from "react";
import useFetchUser from "../utils/useFetchUser";

export const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  // Call useFetchUser unconditionally at the top of the component
  const fetchedUser = useFetchUser();
  const [user, setUser] = useState(fetchedUser);  // Set the user from the hook initially

  // This useEffect ensures that if fetchedUser changes, we update the user state
  useEffect(() => {
    if (fetchedUser) {
      setUser(fetchedUser);
    }
  }, [fetchedUser]);

  const loginUser = (userData) => {
    console.log("Logging in user:", userData);
    setUser(userData);
    localStorage.setItem("Authorization", userData.token);
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("Authorization");
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
