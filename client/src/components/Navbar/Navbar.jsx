import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import AuthModal from "./authModal";
import { useUser } from "../../contexts/userContext";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, loading } = useUser();

  const location = useLocation();

  if (loading) {
    return (
      <div className="h-16 bg-gray-800 animate-pulse"></div>
    );
  }



  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link to="/" onClick={() => setCurrent("")} className="text-2xl font-bold text-blue-600">PhotoShare</Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">

                <Link
                  to="/gallery"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${location.pathname === "/gallery"
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                >
                  Gallery
                </Link>

                {user &&
                  <>
                    <Link
                      to="/upload"
                      className={`rounded-md px-3 py-2 text-sm font-medium ${location.pathname === "/upload"
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                    >
                      Upload
                    </Link>

                    <Link
                      to="/my-uploads"
                      className={`rounded-md px-3 py-2 text-sm font-medium ${location.pathname === "/my-uploads"
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                    >
                      My Uploads
                    </Link>
                    <Link
                      to="/favorites"
                      className={`rounded-md px-3 py-2 text-sm font-medium ${location.pathname === "/favorites"
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                    >
                      My Favorites
                    </Link>
                  </>

                }

                <Link
                  to="/about-us"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${location.pathname === "/about-us"
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                >
                  About
                </Link>

              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            {!user &&

              <button
                onClick={() => setIsModalOpen(true)}
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Sign up
              </button>

            }

            <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <DropdownMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}
