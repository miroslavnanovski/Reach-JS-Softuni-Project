import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Gallery from "./pages/Gallery/Gallery";
import PhotoDetail from "./pages/Gallery/PhotoDetails";
import Navbar from "./components/Navbar/Navbar";
import UserSettings from "./pages/UserSettings/UserSettings";
import ProfileCard from "./pages/Profile/ProfileCard";
import { UserProvider, useUser } from "./contexts/userContext";
import UserGallery from "./pages/Gallery/UserGallery";
import AboutPage from "./pages/About";



function App() {

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
    <UserProvider>
        <div className="bg-gray-100 min-h-screen">
          <Navbar/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/gallery" element={<Gallery/>} />
              <Route path="/gallery/:photoId" element={<PhotoDetail/>} />
              <Route path="/user-gallery" element={<UserGallery/>} />
              <Route path="/:userId/settings" element={<UserSettings/>} />
              <Route path="/:userId/profile" element={<ProfileCard/>} />
              <Route path="/about-us" element={<AboutPage/>} />
            </Routes>
        </div>
      </UserProvider>
    </>
    
  )
}

export default App;
