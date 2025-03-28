import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchModal({ query, loading, results, onClose }) {


    useEffect(() => {
        const escHandler = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", escHandler);
        return () => window.removeEventListener("keydown", escHandler);
    }, [onClose]);

    return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-start pt-24 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Results for "{query}"</h2>
              <button
                onClick={onClose}
                className="text-2xl font-bold text-gray-500 hover:text-black"
              >
                &times;
              </button>
            </div>
    
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : results.length === 0 ? (
              <p className="text-gray-500">No results found.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {results.map((photo) => (
                  <motion.div
                    key={photo._id}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link to={`/gallery/${photo._id}`}>
                      <img
                        src={photo.imageUrl}
                        alt={photo.caption}
                        className="rounded-lg w-full h-40 object-cover"
                      />
                      <p className="mt-1 text-sm text-gray-700 truncate">{photo.caption}</p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      );
    }