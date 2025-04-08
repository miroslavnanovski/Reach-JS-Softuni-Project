import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../contexts/userContext";
import { useUIStore } from "../stores/uiStore";
import { useEffect, useState } from "react";

const RouteGuard = () => {
  const { user, loading } = useUser();
  const setLoginModalOpen = useUIStore((state) => state.setLoginModalOpen);
  const location = useLocation();
  const [allowRender, setAllowRender] = useState(false); // prevents flashing modal

  useEffect(() => {
    if (loading) return;

    const skip = sessionStorage.getItem("skipLoginModal") === "true";

    if (!user && !skip) {
      setLoginModalOpen(true);
    }

    // Clean up the skip flag after redirect happens
    if (skip && !user) {
      setTimeout(() => {
        sessionStorage.removeItem("skipLoginModal");
      }, 500);
    }

    setAllowRender(true);
  }, [user, loading, setLoginModalOpen]);

  if (loading || !allowRender) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-700"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RouteGuard;
