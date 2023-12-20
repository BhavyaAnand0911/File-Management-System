// middleware/auth.js
import jwt from "jsonwebtoken";
import { promisify } from "util";
import User from "../models/user.model.js"; // Assuming you have your User model

const verifyToken = promisify(jwt.verify);

const authMiddleware = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ error: "No access token provided" });
  }

  try {
    const decoded = await verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ error: "Invalid access token" });
    }

    // Attach the user to the request object for further use in the route
    req.user = user;

    next();
  } catch (error) {
    console.error("Authentication error:", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid access token" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default authMiddleware;
