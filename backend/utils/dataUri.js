import DataUriParser from "datauri/parser.js";
import path from "path";
import fs from "fs";

const getDataUri = (file) => {
  const filePath = file.path;
  const parser = new DataUriParser();

  try {
    const fileBuffer = fs.readFileSync(filePath);

    const extName = path.extname(filePath).toString();

    const dataUri = parser.format(extName, fileBuffer);
    return dataUri;
  } catch (error) {
    console.error("Error reading file from disk:", error);
    return null;
  }
};

export default getDataUri;
