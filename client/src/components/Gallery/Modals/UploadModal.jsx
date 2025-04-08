// components/UploadModal.jsx
import { motion } from "framer-motion";

export default function UploadModal({
  show,
  isUploading,
  progress,
  uploadStatus,
  uploadMessage,
  onClose,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center relative">
        {isUploading ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" stroke="#e5e7eb" strokeWidth="10" fill="none" />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                stroke="#4f46e5"
                strokeWidth="10"
                fill="none"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * progress) / 100}
                animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
                transition={{ ease: "easeInOut", duration: 0.2 }}
              />
            </svg>
            <motion.p
              key={progress}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="text-lg font-semibold text-gray-700"
            >
              {progress}%
            </motion.p>
            <p className="text-sm text-gray-500">Uploading your photo...</p>
          </div>
        ) : (
          <>
            {uploadStatus === "success" ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex flex-col items-center space-y-3"
              >
                <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <motion.path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                </svg>
                <p className="text-green-600 font-medium text-lg">{uploadMessage}</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center space-y-3"
              >
                <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-red-600 font-medium text-lg">{uploadMessage}</p>
              </motion.div>
            )}
            <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-md">
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}
