import DataUriParser from "datauri/parser.js";
import path from "path";
import fs from "fs";

const getDataUri = (file) => {
  const filePath = file.path;
  console.log(filePath);
  const parser = new DataUriParser();

  try {
    // Read the file content from disk
    const fileBuffer = fs.readFileSync(filePath);

    // Get the file extension using path.extname
    const extName = path.extname(filePath).toString();
    console.log("This is extension", extName);

    // Create a data URI
    const dataUri = parser.format(extName, fileBuffer);
    //console.log("Data URI:", dataUri);

    return dataUri;
  } catch (error) {
    console.error("Error reading file from disk:", error);
    return null;
  }
};

export default getDataUri;
