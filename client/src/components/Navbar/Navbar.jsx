import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import AuthModal from "./authModal";
import { useUser } from "../../contexts/userContext";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading } = useUser(); // 👈 This will now rerender when user changes

  const location = useLocation();

  
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".mobile-menu") && !e.target.closest(".hamburger")) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  if (loading) {
    return (
      <div className="h-16 bg-gray-800 animate-pulse"></div>
    );
  }

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">

          {/* Hamburger and Mobile */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="hamburger inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Items */}
          {mobileMenuOpen && (
            <div className="mobile-menu sm:hidden absolute top-16 left-0 w-full z-50 bg-gray-900 shadow-md">
              <div className="flex flex-col space-y-1 px-4 py-4 text-gray-300">
                <Link to="/gallery" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 hover:bg-gray-700">Gallery</Link>
                {user && (
                  <>
                    <Link to="/upload" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 hover:bg-gray-700">Upload</Link>
                    <Link to="/my-uploads" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 hover:bg-gray-700">My Uploads</Link>
                    <Link to="/favorites" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 hover:bg-gray-700">Favorites</Link>
                  </>
                )}
                <Link to="/about-us" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 hover:bg-gray-700">About</Link>
              </div>
            </div>
          )}

          {/* Logo & Navigation */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <Link to="/" className="text-2xl font-bold text-blue-600">PhotoShare</Link>
            <div className="hidden sm:flex sm:ml-6 space-x-4">
              <Link to="/gallery" className={`px-3 py-2 text-sm rounded-md ${location.pathname === "/gallery" ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700"}`}>Gallery</Link>
              {user && (
                <>
                  <Link to="/upload" className={`px-3 py-2 text-sm rounded-md ${location.pathname === "/upload" ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700"}`}>Upload</Link>
                  <Link to="/my-uploads" className={`px-3 py-2 text-sm rounded-md ${location.pathname === "/my-uploads" ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700"}`}>My Uploads</Link>
                  <Link to="/favorites" className={`px-3 py-2 text-sm rounded-md ${location.pathname === "/favorites" ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700"}`}>Favorites</Link>
                </>
              )}
              <Link to="/about-us" className={`px-3 py-2 text-sm rounded-md ${location.pathname === "/about-us" ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700"}`}>About</Link>
            </div>
          </div>

          {/* Right: Auth + Dropdown */}
          <div className="flex items-center space-x-3">
            {!user && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-3 py-2 text-sm rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Sign up
              </button>
            )}
            <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            {user && <DropdownMenu />} {/* Ensure DropdownMenu uses useUser() too */}
          </div>
        </div>
      </div>
    </nav>
  );
}
