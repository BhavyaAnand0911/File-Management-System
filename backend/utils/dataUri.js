import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
  const parser = new DataUriParser();
  console.log(file.path);
  console.log(file);
  const extName = path.extname(file.path).toString();
  console.log("This is extension", extName);
  parser.format(extName, file.buffer);
};

export default getDataUri;
