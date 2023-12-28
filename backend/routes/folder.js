import express from "express";
import Folder from "../models/folder.model.js";
import authMiddleware from "../utils/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, owner } = req.body;

    const folder = new Folder({ name, owner });
    await folder.save();

    res.status(201).json(folder);
  } catch (error) {
    console.log("Error saving folder:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
