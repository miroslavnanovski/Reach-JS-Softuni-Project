import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useLogin(email,password) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json(); // Get the response JSON
  
      if (res.ok) {
          localStorage.setItem("Authorization", data.token); // Store token
        navigate("/");
      } else {
        alert("Invalid credentials!");
      }
    };
}