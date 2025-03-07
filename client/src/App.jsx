import "./App.css"
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Upload from "./pages/Upload";

function App() {

  return (
    <>
        <div className="bg-gray-100 min-h-screen">
          <Navbar />
          <div className="p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/upload" element={<Upload />} />
            </Routes>
          </div>
        </div>
    </>
  )
}

export default App;
