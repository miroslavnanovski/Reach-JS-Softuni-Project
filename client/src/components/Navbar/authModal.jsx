import { useState } from "react";
import { useLogin, useRegister } from "../../api/authApi";
import { useUser } from "../../contexts/userContext";
import axios from "axios";

const AuthModal = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", username: "" });
  const [error, setError] = useState("");

  const { register } = useRegister();
  const { login } = useLogin();
  const { loginUser } = useUser();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error

    if (!formData.email || !formData.password || (isSignUp && !formData.username)) {
      setError("Please fill all fields.");
      return;
    }

    try {
      let data;
      
      if (isSignUp) {
        const response = await register(formData.username, formData.email, formData.password);
      
       

        if (!response || !response.token || !response.user) {
          throw new Error("Invalid response from register");
        }
        data = response;
      } else {
        const response = await login(formData.email, formData.password);
        if (!response || !response.token || !response.user) {
          throw new Error("Invalid response from login");
        }
      
        data = response;
      }
    
      // If we have valid data, store user and close modal
      loginUser(data);
      setFormData({ email: "", password: "", username: "" });
      onClose();
    } catch (error) {
      console.error("Authentication Error:", error);
      setError(error.message || "Something went wrong");
    }
  }





  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
        {/* Close Button Inside the Modal */}
        <button className="absolute top-2 right-3 text-gray-500 hover:text-gray-700" onClick={onClose}>
          ✖
        </button>

        <h2 className="text-xl font-semibold text-center">
          {isSignUp ? "Sign Up" : "Log In"}
        </h2>
        <p className="text-gray-600 text-center mb-4">
          {isSignUp ? "Create an account to continue" : "Welcome back! Log in to continue"}
        </p>

        {error && <p className="text-red-500 text-center">{error}</p>} {/* Display Error */}

        <form onSubmit={handleSubmit} className="space-y-3">
          {isSignUp && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full p-2 border rounded"
              value={formData.username}
              onChange={handleChange}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-900">
            {isSignUp ? "Create an account" : "Log in"}
          </button>
        </form>

        <p className="text-center text-sm mt-3">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button className="text-blue-500 hover:underline" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Log in" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  ) : null;
};

export default AuthModal;
