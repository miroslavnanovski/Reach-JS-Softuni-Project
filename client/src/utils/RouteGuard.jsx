import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { useUser } from "../contexts/userContext"
import { useUIStore } from "../stores/uiStore";
import { useEffect } from "react";

const RouteGuard = () => {
  const { user, loading } = useUser();
    const setLoginModalOpen = useUIStore((state) => state.setLoginModalOpen);
    const navigate = useNavigate();


    useEffect(() => {
      if (!loading && !user) {
        setLoginModalOpen(true);
        navigate('/');
      }
    }, [user, loading, setLoginModalOpen]);
    
    if (loading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-700"></div>
        </div>
      );
    }
    
    if (!user) return null;
    
      return <Outlet/>;

}

export default RouteGuard;