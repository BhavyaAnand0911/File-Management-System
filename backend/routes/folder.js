import router from "./login.js";
import express from "express";
import mongoose from "mongoose";
import Folder from "../models/folder.model.js";
import authMiddleware from "../utils/authMiddleware.js";

// API endpoint to add a new folder
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;

    const folder = new Folder({ name, owner });
    await folder.save();

    res.status(201).json(folder);
  } catch (error) {
    console.log("Token Verification Error:", error);
    console.error(error);
    res.status(401).json({ error: "Unauthorized" });
  }
});

export default router;
