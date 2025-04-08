import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";

import Gallery from "./components/Gallery/Gallery";
import PhotoDetail from "./components/Gallery/PhotoDetails";
import Navbar from "./components/Navbar/Navbar";
import UserSettings from "./components/UserSettings/UserSettings";
import ProfileCard from "./components/Profile/ProfileCard";
import AboutPage from "./components/About";
import UserGallery from "./components/Gallery/MyUploads";
import FavoritesGallery from "./components/Gallery/FavoritesGallery";
import { useUser } from "./contexts/userContext";
import { useUIStore } from "./stores/uiStore";
import AuthModal from "./components/Navbar/authModal";
import RouteGuard from "./utils/routeGuard";
import { Toaster } from "react-hot-toast";
import NotFound from "./components/NotFound";
import Upload from "./components/UploadSection/Upload";
import { useEffect } from "react";


function App() {
  const loginModalOpen = useUIStore((state) => state.loginModalOpen);
  const setLoginModalOpen = useUIStore((state) => state.setLoginModalOpen);
  const showSignupByDefault = useUIStore((state) => state.showSignupByDefault);
  const { loading } = useUser();


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AuthModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        initialState={!showSignupByDefault}
      />
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:photoId" element={<PhotoDetail />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />


          {/* Grouped protected routes */}
          <Route element={<RouteGuard />}>
            <Route path="/upload" element={<Upload />} />
            <Route path="/my-uploads" element={<UserGallery />} />
            <Route path="/favorites" element={<FavoritesGallery />} />
            <Route path="/:userId/settings" element={<UserSettings />} />
            <Route path="/:userId/profile" element={<ProfileCard />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
