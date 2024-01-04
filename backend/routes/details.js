// routes/user.js
import express from "express";
import authMiddleware from "../utils/authMiddleware.js";
import User from "../models/user.model.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = req.user;

    const userDetails = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };

    res.status(200).json(userDetails);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
