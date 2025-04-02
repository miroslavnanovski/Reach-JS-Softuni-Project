import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/userContext";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useUIStore } from "../../stores/uiStore";


export default function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null); // Reference for the dropdown menu
  const { user } = useUser();
  const navigate = useNavigate();

  const { logoutUser } = useUser();
  const setLoginModalOpen = useUIStore((state) => state.setLoginModalOpen);


  const handleLogout = () => {
    setIsOpen(false);
    const toastId = toast.loading("Signing out...");
  
    setTimeout(() => {
      logoutUser();
      setLoginModalOpen(false); // 👈 Prevent the modal from opening after logout
      toast.success("Signed out successfully", { id: toastId });
      navigate("/");
    }, 1000);
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
    <>
      <div className="relative" ref={menuRef}>
        {/* Toggle Button */}
        <div className="relative ml-3">
          <div>
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="relative flex items-center justify-center rounded-full focus:outline-none"
              id="user-menu-button"
              aria-expanded={isOpen}
              aria-haspopup="true"
              whileHover={{ scale: 1.08, boxShadow: "0px 6px 15px rgba(0,0,0,0.2)" }}
              whileFocus={{
                scale: 1.08,
                boxShadow: "0px 0px 0px 4px rgba(59,130,246,0.5)", // blue-500 glow
              }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <span className="sr-only">Open user menu</span>
              <motion.img
                src={user?.profilePicture || "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="}
                alt="User avatar"
                className="w-10 h-10 rounded-full object-cover border-2 border-transparent focus-visible:outline-none"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
                }}
                whileFocus={{
                  scale: 1.1,
                  boxShadow: "0px 0px 0px 4px rgba(59, 130, 246, 0.5)", // Tailwind blue-500 ring
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                tabIndex={0} // ⬅️ Important for keyboard focus
              />

            </motion.button>



          </div>
        </div>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute left-1/2 -translate-x-1/2 mt-2 w-36 z-40 origin-top rounded-md bg-white py-0.5 shadow-lg ring-1 ring-black/5 space-y-1"

              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabIndex={-1}
            >
              <Link
                onClick={() => setIsOpen(false)}
                to={`/${user._id}/profile`}
                className="block px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabIndex={-1}
              >
                Your Profile
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                to={`/${user._id}/settings`}
                className="block px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabIndex={-1}
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="block px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabIndex={-1}
              >
                Sign out
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
     
    </>
  );
}
