import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Gallery from "./pages/Gallery/Gallery";
import PhotoDetail from "./pages/Gallery/PhotoDetails";
import Navbar from "./components/Navbar/Navbar";
import UserSettings from "./pages/UserSettings/UserSettings";
import ProfileCard from "./pages/Profile/ProfileCard";
import { UserProvider } from "./contexts/userContext";
import UserGallery from "./pages/Gallery/UserGallery";



function App() {



  return (
    <>
    <UserProvider>
        <div className="bg-gray-100 min-h-screen">
          <Navbar/>
          <div className="p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/gallery" element={<Gallery/>} />
              <Route path="/gallery/:photoId" element={<PhotoDetail/>} />
              <Route path="/user-gallery" element={<UserGallery/>} />
              <Route path="/:userId/settings" element={<UserSettings/>} />
              <Route path="/:userId/profile" element={<ProfileCard/>} />
            </Routes>
          </div>
        </div>
      </UserProvider>
    </>
    
  )
}

export default App;
