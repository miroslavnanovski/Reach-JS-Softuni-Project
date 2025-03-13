import { Link } from "react-router-dom";

export default function Navbar() {
  
   
    return (
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">PhotoShare</Link>
        <div>
        <Link to="/" className="text-gray-600 hover:text-blue-600 mx-4">Home</Link>
        <Link to="/upload" className="text-gray-600 hover:text-blue-600 mx-4">Upload</Link>
        <Link to="/gallery" className="text-gray-600 hover:text-blue-600 mx-4">Gallery</Link>
        <Link to="/login" className="text-gray-600 hover:text-blue-600 mx-4">Login</Link>
        <Link to="/register" className="text-gray-600 hover:text-blue-600 mx-4">Register</Link>
        </div>
      </nav>
    );
  }
  