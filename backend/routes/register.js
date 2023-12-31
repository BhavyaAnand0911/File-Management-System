import express from "express";
const router = express.Router();
import User from "../models/user.model.js";

// router.get("/", (req, res) => {
//   res.send("Register");
// });
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();
    console.log(newUser);

    const accessToken = newUser.generateAccessToken();
    const refreshToken = newUser.generateRefreshToken();

    res.status(201).json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;
