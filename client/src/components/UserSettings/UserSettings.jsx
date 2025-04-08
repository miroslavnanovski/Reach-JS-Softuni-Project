import { useEffect, useState } from "react"
import EmailInput from "./EmailInput";
import axios from "axios";
import PasswordInput from "./PasswordInput";
import { useUser } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "../Gallery/Modals/ConfirmDeleteModal";
import { toast } from "react-hot-toast";

export default function UserSettings() {
  const [isChangeOpen, setIsChangeOpen] = useState(false);
  const [email, setEmail] = useState('')
  const [emailDisplay, setEmailDisplay] = useState('')
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();


  const { user, loginUser, logoutUser, token } = useUser()

  const URL = import.meta.env.VITE_API_BASE_URL;





  useEffect(() => {
    if (user && user.email) {
      setEmailDisplay(user.email);
    }
  }, [user]);

  useEffect(() => {
    if (isChangeOpen && user?.email) {
      setEmail(user.email);
    }
  }, [isChangeOpen, user]);
  



  const handleEmailChange = (email) => {
    setEmail(email);
    setError('');
  };

  const handleSubmit = async (newEmail) => {
    if (!newEmail) {
      setError('Email field cannot be empty!');
      return;
    }
  
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);
    if (!isValidEmail) {
      setError('Please enter a valid email address.');
      return;
    }
  
    try {
      const response = await axios.post(
        `${URL}/api/user/update-email`,
        { newEmail },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
  
      const { updatedUser, token: newToken } = response.data;
  
      //  Update context with new token + user
      loginUser({
        user: updatedUser,
        token: newToken,
      });
  
      setEmailDisplay(newEmail);
      setIsChangeOpen(false);
      setError("");
      toast.success('Email changed successfully!')
  
    } catch (error) {

      console.error("API Error:", error);
      
      const message = error?.response?.data?.message || "Failed to update email. Please try again.";
      setError(message);
      
    }
  };

  const handleUserDelete = async () => {
    if (!user?._id) return;

    try {
      await axios.delete(
        `${URL}/api/user/${user._id}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEmailDisplay('');
      setIsChangeOpen(false);
      setError('');

      logoutUser();
      
      navigate('/')
    } catch (error) {
      console.error('API Error:', error);
      setError('Failed to delete user. Please try again.');
    }
  };



  return (
    <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
      <h1 className="py-6 text-4xl font-semibold">Settings</h1>
      <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
        <div className="pt-4">
          <h1 className="py-2 text-2xl font-semibold">Account settings</h1>
          {/* <p class="font- text-slate-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p> */}
        </div>
        <hr className="mt-4 mb-8" />
        <p className="py-2 text-xl font-semibold">Email Address</p>

<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
  <div>
    {isChangeOpen ? (
      <EmailInput onEmailChange={handleEmailChange} error={error} />
    ) : (
      <p>Your email address is <strong>{emailDisplay}</strong></p>
    )}
  </div>

  <div className="flex gap-3">
    {isChangeOpen ? (
      <>
        <button
          onClick={() => handleSubmit(email)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
        <button
          onClick={() => {
            setError('');
            setIsChangeOpen(false);
          }}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </>
    ) : (
      <button
        onClick={() => setIsChangeOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Change
      </button>
    )}
  </div>
</div>


        <PasswordInput />


        <hr className="mt-4 mb-8" />
        <div className="mb-10">
          <p className="py-2 text-xl font-semibold">Delete Account</p>
          <p className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Proceed with caution
          </p>
          <p className="mt-2">
            Make sure you have taken backup of your account in case you ever need
            to get access to your data. We will completely wipe your data. There
            is no way to access your account after this action.
          </p>
          <button
            className="ml-auto mt-4 px-4 py-2 text-sm font-semibold text-white bg-rose-600 rounded-xl hover:bg-rose-700 transition duration-200"
            onClick={() => setIsModalOpen(true)}
          >
            Delete Account
          </button>
          <ConfirmDeleteModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onDelete={handleUserDelete}
            title="Are you sure you want to delete your account?"
            description="This action cannot be undone. All your data will be lost."
            confirmText="Yes, delete my account"
            cancelText="Cancel"
          />
        </div>
      </div>
    </div>

  )
}