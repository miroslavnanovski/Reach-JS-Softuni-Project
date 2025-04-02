import { useState } from "react";
import { motion,AnimatePresence  } from "framer-motion";

export default function EmailInput({ onEmailChange, error }) {
    const [email, setEmail] = useState('');
  
    const handleChange = (event) => {
      const value = event.target.value;
      setEmail(value);
      onEmailChange(value);
    };
  
    return (
      <div>
        <div className="relative">
          {/* Icon */}
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
            </svg>
          </div>
  
          {/* Input */}
          <input
            type="email"
            id="input-group-1"
            className={`bg-white border ${
              error ? 'border-red-500' : 'border-gray-300'
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] ps-10 p-2.5`}
            placeholder="your email goes here.."
            value={email}
            onChange={handleChange}
          />
        </div>
  
        {/* Error with animation */}
        <AnimatePresence>
          {error && (
            <motion.p
              key="email-error"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="text-red-500 text-sm ps-2 mt-1 overflow-hidden"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
  