import { jwtDecode } from "jwt-decode"

export default function decodeToken() {
    const token = localStorage.getItem('Authorization');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded; 
      } catch (error) {
        console.error('Token decode error:', error);
        return null;
      }
    }
    return null;
  }