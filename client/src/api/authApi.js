import axios from "axios";

const URL = "http://localhost:3000/api/auth"; 

export const useLogin = () => {
    const login = async (email, password) => {
        try {
            const result = await axios.post(`${URL}/login`, { email, password });
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
            const result = await axios.post(`${URL}/register`, { username, email, password });
          

        } catch (error) {
            console.error("Registration Error:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "Registration failed");
        }
    };

    return { register };
};


// TODO: logout functionality on backend and here