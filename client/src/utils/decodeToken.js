import { jwtDecode } from "jwt-decode"

export default function decodeToken() {
    const token = localStorage.getItem('authToken'); // or from cookies if you store it there
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded.userId; // assuming the token contains a userId
      } catch (error) {
        console.error('Token decode error:', error);
        return null;
      }
    }
    return null;
  }