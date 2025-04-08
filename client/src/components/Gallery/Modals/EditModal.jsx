import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function EditModal({
    setShowEditModal,
    handleEditSubmit,
    editCaption,
    setEditCaption,
    editTitle,
    setEditTitle,
    imageUrl,
}) {
    return (
        <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-lg relative"
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                {/* Close Button */}
                <button
                    onClick={() => setShowEditModal(false)}
                    className="absolute top-2 right-2 text-black hover:text-red-600 transition-transform hover:scale-110"
                    aria-label="Close"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Image */}
                {imageUrl && (
                    <div className="mb-4">
                        <img
                            src={imageUrl}
                            alt="Preview"
                            className="rounded-lg w-full h-56 object-cover shadow-sm"
                        />
                    </div>
                )}

                <h2 className="text-lg font-semibold text-gray-800 mb-5 text-center">
                    Edit Photo Info
                </h2>

                <form onSubmit={handleEditSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Caption</label>
                        <textarea
                            value={editCaption}
                            onChange={(e) => setEditCaption(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            rows={4}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition transform hover:scale-[1.02] text-sm"
                    >
                        Save Changes
                    </button>
                </form>
            </motion.div>
        </motion.div>
    );
}
