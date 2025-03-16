import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


export default function DropdownMenu () {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null); // Reference for the dropdown menu

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
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
    </button>
  </div>
</div>


      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 focus:outline-hidden
          transition ease-out duration-100 transform opacity-100 scale-100"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabIndex={-1}
        >
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
            tabIndex={-1}
          >
            Your Profile
          </a>
          <Link
            onClick={() => setIsOpen(!isOpen)}
            to="/:userId/settings"
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
            tabIndex={-1}
          >Settings
          </Link>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
            tabIndex={-1}
          >
            Sign out
          </a>
        </div>
      )}
    </div>
  );
};
