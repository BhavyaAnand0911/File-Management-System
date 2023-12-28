import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
});

const Folder = mongoose.model("Folder", folderSchema);

export default Folder;
