import axios from "axios";


const URL = import.meta.env.VITE_API_BASE_URL;



export const useLogin = () => {
    const login = async (email, password) => {
        try {
            const result = await axios.post(`${URL}/api/auth/login`, { email, password });
            return result.data; 
        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "Login failed");
        }
    };

    return { login };
};

export const useRegister = () => {
    const register = async (username, email, password) => {
        try {
            const result = await axios.post(`${URL}/api/auth/register`, { username, email, password });
            
            return result.data;
            

        } catch (error) {
            console.error("Registration Error:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "Registration failed");
        }
    };

  
    return { register };
};


