import express from "express";
import File from "../models/file.model.js";
import upload from "../utils/multerMiddleware.js";
import authMiddleware from "../utils/authMiddleware.js";
import uploadOnCloudinary from "../utils/couldinary.service.js";
import getDataUri from "../utils/dataUri.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("working");
});
router.post("/", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    // Save file data to MongoDB
    const newFile = new File({
      filename: req.file.filename,
      path: req.file.path,
      owner: req.body.owner,
      folder: req.body.folder,
    });

    //console.log(req.file.path);

    const savedFile = await newFile.save();
    console.log(" file", req.file);

    // Upload file to Cloudinary
    const fileUri = getDataUri(req.file);
    console.log(fileUri);
    const cloudinaryResponse = await uploadOnCloudinary(fileUri);
    console.log("Cloudinary Response:", cloudinaryResponse);

    // Check if the Cloudinary upload was successful
    if (cloudinaryResponse) {
      savedFile.cloudinaryUrl = cloudinaryResponse.url;
      await savedFile.save();

      res.status(201).json({
        message: "File uploaded successfully",
        cloudinaryUrl: cloudinaryResponse.url,
      });
    } else {
      // Handle Cloudinary upload failure
      res.status(500).json({ message: "Cloudinary upload failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
