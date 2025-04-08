import { useEffect, useState } from "react";
import { useLogin, useRegister } from "../../api/authApi";
import { useUser } from "../../contexts/userContext";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";


const AuthModal = ({ isOpen, onClose, initialState = true }) => {
  const [isSignUp, setIsSignUp] = useState(initialState);
  const [formData, setFormData] = useState({ email: "", password: "", username: "" });
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [error, setError] = useState("");

  const { register } = useRegister();
  const { login } = useLogin();
  const { loginUser } = useUser();
  
// Update isSignUp when initialState or isOpen changes:

  useEffect(() => {
    if (isOpen) {
      setIsSignUp(initialState);
    }
  }, [initialState, isOpen]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoggingIn(true);
  
    if (!formData.email || !formData.password || (isSignUp && !formData.username)) {
      setError("Please fill all fields.");
      setIsLoggingIn(false);
      return;
    }
  
    try {
      let data;
  
      if (isSignUp) {
        const toastId = toast.loading("Creating account...");
        try {
          const response = await register(formData.username, formData.email, formData.password);
  
          if (!response || !response.token || !response.user) {
            throw new Error("Invalid response from register");
          }
  
          toast.dismiss(toastId);
          toast.success("Account created successfully!");
          data = response;
          await new Promise((res) => setTimeout(res, 500));
        } catch (err) {
          toast.dismiss(toastId);
          throw err;
        }
      } else {
        const response = await login(formData.email, formData.password);
        if (!response || !response.token || !response.user) {
          throw new Error("Invalid response from login");
        }
        data = response;
      }
  
      const loginToastId = toast.loading("Logging in...");
      await loginUser(data);
  
      setTimeout(() => {
        toast.success("Logged in successfully!", { id: loginToastId });
        setFormData({ email: "", password: "", username: "" });
        onClose();
        setIsLoggingIn(false);
      }, 1000);
    } catch (error) {
      console.error("Authentication Error:", error);
      toast.error(error.message || "Something went wrong");
      setError(error.message || "Something went wrong");
      setIsLoggingIn(false);
    }
  };
  
  
  





  return (
    <>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg w-96 relative"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              ✖
            </button>

            <AnimatePresence mode="wait" initial={false}>
              {isSignUp ? (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-semibold text-center">Sign Up</h2>
                  <p className="text-gray-600 text-center mb-4">Create an account to continue</p>

                 {/* Error part */}
                  <AnimatePresence mode="wait" initial={false}>
                    {error && (
                      <motion.p
                        key="auth-error"
                        className="text-red-500 text-center mb-2"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      className="w-full p-2 border rounded"
                      value={formData.username}
                      onChange={handleChange}
                    />
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
                    <motion.button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-900"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Create an account
                    </motion.button>
                  </form>

                  <p className="text-center text-sm mt-3">
                    Already have an account?{" "}
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => {
                        setIsSignUp(false)
                        setError('')
                      }}
                    >
                      Log in
                    </button>
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-semibold text-center">Log In</h2>
                  <p className="text-gray-600 text-center mb-4">
                    Welcome back! Log in to continue
                  </p>

                  {/* Error part */}
                  <AnimatePresence mode="wait" initial={false}>
                    {error && (
                      <motion.p
                        key="auth-error"
                        className="text-red-500 text-center mb-2"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="space-y-3">
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
                    <motion.button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-900"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Log in
                    </motion.button>
                  </form>

                  <p className="text-center text-sm mt-3">
                    Don’t have an account?{" "}
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => {
                        setIsSignUp(true)
                        setError('')
                      }}
                    >
                      Sign up
                    </button>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    </>
  );
};

export default AuthModal;
