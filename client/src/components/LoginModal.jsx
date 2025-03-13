import { useState } from "react";

export default function LoginModal({ isOpen, onClose }){
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50">
      <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Sign in</h3>
          <button onClick={onClose} className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600">
            ✖
          </button>
        </div>
        <div className="p-4">
          <form className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input type="email" className="w-full p-2 border rounded-lg dark:bg-gray-600 dark:text-white" required />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input type="password" className="w-full p-2 border rounded-lg dark:bg-gray-600 dark:text-white" required />
            </div>
            <button type="submit" className="w-full bg-blue-700 text-white p-2 rounded-lg">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

