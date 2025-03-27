import { createContext, useState, useEffect, useContext } from "react";
import useFetchUser from "../utils/useFetchUser";

const UserContext = createContext({
  user: null,
  token: null,
  loading: true,
  loginUser: () => {},
  logoutUser: () => {},
});



export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("Authorization") || null);
  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(true);


  const { user: fetchedUser, fetched } = useFetchUser();

  useEffect(() => {
   
    if(fetched){
      setUser(fetchedUser || null);
      setLoading(false)
    }
    
  }, [fetched,fetchedUser]);
  

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
    <UserContext.Provider value={{ user, token, loginUser, logoutUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ Export only one default provider
export { UserContext, UserProvider };
