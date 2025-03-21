import jwt from "jsonwebtoken";

const Auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract token
  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded); // Debugging

      req.user = { userId: decoded.userId }; // ✅ Attach user to request
      
      
      next();
  } catch (error) {
      console.error("Token verification failed:", error.message);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default Auth;