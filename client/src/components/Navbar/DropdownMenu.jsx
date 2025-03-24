import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext, useUser } from "../../contexts/userContext";

export default function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null); // Reference for the dropdown menu
  const { user } = useUser();
  const navigate = useNavigate();

  const { logoutUser } = useUser();
  

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  // Function to handle clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener when component unmounts or dropdown closes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Only render the dropdown if the user is available
  if (!user) {
    return null; // Or render something else like a login button
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* Toggle Button */}
      <div className="relative ml-3">
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
            id="user-menu-button"
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <img
              className="size-8 rounded-full"
              src={user.profilePicture}
              alt=""
            />
          </button>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 z-40 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 focus:outline-hidden
          transition ease-out duration-100 transform opacity-100 scale-100"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabIndex={-1}
        >
          <Link
            onClick={() => setIsOpen(!isOpen)}
            to={`/${user._id}/profile`}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
            tabIndex={-1}
          >
            Your Profile
          </Link>
          <Link
            onClick={() => setIsOpen(!isOpen)}
            to={`/${user._id}/settings`}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
            tabIndex={-1}
          >
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
            tabIndex={-1}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
