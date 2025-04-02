import { jwtDecode } from "jwt-decode";

export default function decodeToken(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) {
    return null; // 
  }

  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Token decode error:", error);
    return null;
  }
}
