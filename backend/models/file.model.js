import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
      index: true,
    },
    path: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    folder: {
      type: String,
    },
    cloudinaryUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const File = mongoose.model("File", fileSchema);

export default File;
