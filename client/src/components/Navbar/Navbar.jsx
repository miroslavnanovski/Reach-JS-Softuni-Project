import { useState } from "react";
import { Link } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import AuthModal from "./authModal";

export default function Navbar() {
    const [current,setCurrent] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);

   
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
            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
          
            <Link
        to="/gallery"
        className={`rounded-md px-3 py-2 text-sm font-medium ${
          current === "gallery" ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
        }`}
        onClick={() => setCurrent("gallery")}
      >
        Gallery
      </Link>
  
      <Link
        to="/upload"
        className={`rounded-md px-3 py-2 text-sm font-medium ${
          current === "upload" ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
        }`}
        onClick={() => setCurrent("login")}
      >
        Upload
      </Link>
            <a
              href="#"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              About
            </a>
          </div>
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        {/* <button   NOTIFICATION ICON - TODO:
          type="button"
          className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
        >
          <span className="absolute -inset-1.5" />
          <span className="sr-only">View notifications</span>
          <svg
            className="size-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
            />
          </svg>
        </button> */}
        {/* Profile dropdown */}
        <button
              onClick={() => setIsModalOpen(true)}
              href="#"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Sign up
            </button>
            <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        <DropdownMenu/>
      </div>
    </div>
  </div>
</nav>

      // <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      //   <Link to="/" className="text-2xl font-bold text-blue-600">PhotoShare</Link>
      //   <div>
      //   <Link to="/" className="text-gray-600 hover:text-blue-600 mx-4">Home</Link>
      //   <Link to="/upload" className="text-gray-600 hover:text-blue-600 mx-4">Upload</Link>
      //   <Link to="/gallery" className="text-gray-600 hover:text-blue-600 mx-4">Gallery</Link>
      //   <Link to="/login" className="text-gray-600 hover:text-blue-600 mx-4">Login</Link>
      //   <Link to="/register" className="text-gray-600 hover:text-blue-600 mx-4">Register</Link>
      //   </div>
      // </nav>
    );
  }
  