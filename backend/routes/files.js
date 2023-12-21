import express from "express";
import multer from "multer";
import path from "path";
import File from "../models/file.model.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
// router.get("/", (req, res) => {
//   res.send("Upload");
// });
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const newFile = new File({
      filename: req.file.filename,
      path: req.file.path,
      owner: req.body.owner,
      folder: req.body.folder,
    });

    const savedFile = await newFile.save();

    res.status(201).json(savedFile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
