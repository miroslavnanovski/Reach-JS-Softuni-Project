import { useEffect, useState } from "react"
import EmailInput from "./EmailInput";
import axios from "axios";
import useFetchUser from "../../utils/useFetchUser";
import PasswordInput from "./PasswordInput";

export default function UserSettings() {
  const [isChangeOpen, setIsChangeOpen] = useState(false);
  const [email, setEmail] = useState('')
  const [emailDisplay,setEmailDisplay] = useState('')

  const token = localStorage.getItem('Authorization');

  const user = useFetchUser();

  
  useEffect(() => {
    if (user && user.email) {
      setEmailDisplay(user.email);
    }
  }, [user]);
  


  

  const handleEmailChange = (email) => {
    setEmail(email);  
  };

  const handleSubmit = async (newEmail) => {
    if (!email) return; // Prevent empty submissions

    try {
      const response = await axios.post(`http://localhost:3000/api/user/update-email`,
         {newEmail},
         {
          headers:{
            'Authorization': `Bearer ${token}`
          }
         }
        );
      setEmailDisplay(newEmail);
      setIsChangeOpen(!isChangeOpen)

      console.log("API Response: success");
    } catch (error) {
      console.error("API Error:", error);
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">

          {isChangeOpen ?
            <EmailInput onEmailChange={handleEmailChange} className="absolute" /> :
            <p>Your email address is <strong>{emailDisplay}</strong></p>
          }


          {isChangeOpen ?
          <>
          <div className="flex gap-3">
            <button
            onClick={() => handleSubmit(email)}
            className="mt-2 px-4 py-2 bg-blue-600  text-white rounded-lg hover:bg-blue-700 transition">
              Submit
          </button>  

          <button
           onClick={() => setIsChangeOpen(!isChangeOpen)}
            className="mt-2 px-4 py-2 bg-blue-600  text-white rounded-lg hover:bg-blue-700 transition">
              Cancel
          </button> 
          </div>
          </>
          :
            <button
              onClick={() => setIsChangeOpen(!isChangeOpen)}
              className="mt-2 px-4 py-2 bg-blue-600  text-white rounded-lg hover:bg-blue-700 transition">
                Change
            </button>
          }
        </div>

        <PasswordInput/>

        {/* <p className="mt-2">
          Can't remember your current password.{" "}
          <a
            className="text-sm font-semibold text-blue-600 underline decoration-2"
            href="#"
          >
            Recover Account
          </a>
        </p> */}


        
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
          <button className="ml-auto text-sm font-semibold text-rose-600 underline decoration-2">
            Continue with deletion
          </button>
        </div>
      </div>
    </div>

  )
}