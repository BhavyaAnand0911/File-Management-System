// middleware/auth.js
import jwt from "jsonwebtoken";
import { promisify } from "util";
import User from "../models/user.model.js";

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
