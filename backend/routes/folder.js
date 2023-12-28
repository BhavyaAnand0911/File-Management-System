import express from "express";
import Folder from "../models/folder.model.js";
import authMiddleware from "../utils/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, owner } = req.body;
    // console.log(name);
    // console.log(owner);

    const folder = new Folder({ name, owner });
    await folder.save();

    res.status(201).json(folder);
  } catch (error) {
    console.log("Error saving folder:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const { user } = req;
    // console.log("This is user");
    // console.log(user);

    const folders = await Folder.find({ owner: user.username });

    res.status(200).json(folders);
  } catch (error) {
    console.error("Error fetching folders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
