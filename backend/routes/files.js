import express, { response } from "express";
import File from "../models/file.model.js";
import upload from "../utils/multerMiddleware.js";
import authMiddleware from "../utils/authMiddleware.js";
import uploadOnCloudinary from "../utils/couldinary.service.js";
import getDataUri from "../utils/dataUri.js";

const router = express.Router();

router.get("/files", authMiddleware, async (req, res) => {
  try {
    const currentUser = req.query.username;
    const folderName = req.query.folder;

    const files = await File.find({
      owner: currentUser,
      folder: folderName,
    });

    res.status(200).json({ files });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    const newFile = new File({
      filename: req.file.filename,
      path: req.file.path,
      owner: req.body.owner,
      folder: req.body.folder,
    });

    const savedFile = await newFile.save();
    console.log("File saved to MongoDB:", savedFile);

    const fileUri = getDataUri(req.file);
    //console.log(fileUri);
    const cloudinaryResponse = await uploadOnCloudinary(fileUri);
    //console.log("Cloudinary Response:", cloudinaryResponse);

    if (cloudinaryResponse && cloudinaryResponse.url) {
      savedFile.cloudinaryUrl = cloudinaryResponse.url;
      await savedFile.save();

      res.status(201).json({
        message: "File uploaded successfully",
        cloudinaryUrl: cloudinaryResponse.url,
      });
    } else {
      res.status(500).json({ message: "Cloudinary upload failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
