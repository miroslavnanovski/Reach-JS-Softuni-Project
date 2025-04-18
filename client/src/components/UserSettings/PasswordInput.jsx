import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";


export default function PasswordInput() {

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const URL = import.meta.env.VITE_API_BASE_URL;

  const token = localStorage.getItem("Authorization");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError('');
    setSuccessMessage('');
    if (name === "currentPassword") setCurrentPassword(value);
    if (name === "newPassword") setNewPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    try {

      const response = await axios.post(`${URL}/api/user/update-password`, {
        currentPassword,
        newPassword
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      )
 

      if (response.data.message === 'Password updated successfully') {
        toast.success("Password changed successfully.")
        setSuccessMessage("Password changed successfully.");
        setError(""); // Clear any previous error messages
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

      }

    } catch (error) {
      setError(error.response.data.message);
    }

  }


  return (
    <>
      <hr className="mt-4 mb-8" />
      <p className="py-2 text-xl font-semibold">Password</p>
      <div className="flex items-center">
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
          <label htmlFor="login-password">
            <span className="text-sm text-gray-500">Current Password</span>
            <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
              <input
                type="password"
                name="currentPassword"
                className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="***********"
                onChange={handleChange}
                value={currentPassword}
                required

              />
            </div>
          </label>
          <label htmlFor="login-password">
            <span className="text-sm text-gray-500">New Password</span>
            <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
              <input
                type="password"
                name="newPassword"
                className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="***********"
                onChange={handleChange}
                value={newPassword}
                required
              />
            </div>
          </label>
          <label htmlFor="login-password">
            <span className="text-sm text-gray-500">Confirm New Password</span>
            <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
              <input
                type="password"
                name="confirmPassword"
                className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="***********"
                onChange={handleChange}
                value={confirmPassword}
                required
              />
            </div>
          </label>
        </div>
      </div>

      {/* TODO: Implement a better looking notification */}

      <AnimatePresence>
        {error && (
          <motion.p
            key="password-error"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="text-red-500 text-sm mt-1 ps-2 overflow-hidden"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {successMessage && (
          <motion.p
            key="password-success"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="text-green-500 text-sm mt-1 ps-2 overflow-hidden"
          >
            {successMessage}
          </motion.p>
        )}
      </AnimatePresence>


      <button
        onClick={handleSubmit}
        className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">
        Save Password
      </button>
    </>
  );
}