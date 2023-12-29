import { v2 as cloudinaryV2 } from "cloudinary";

import fs from "fs";
import { resolve } from "path";

async function initializeCloudinary() {
  cloudinaryV2.config({
    cloud_name: "your_cloud_name",
    api_key: "your_api_key",
    api_secret: "your_api_secret",
  });
}

const uploadOnCloudinary = async (localFilePath) => {
  try {
    console.log("Local File Path:", localFilePath);
    if (!localFilePath) console.log("Path not found");

    // Upload on Cloudinary
    await initializeCloudinary();
    console.log("Cloudinary Configuration:", cloudinaryV2.config());

    const response = await new Promise((resolve, reject) => {
      cloudinaryV2.v2.uploader.upload(localFilePath);
    });

    console.log("Cloudinary API Response:", response);

    if (response && response.url) {
      console.log("File uploaded successfully on Cloudinary", response.url);
      return response;
    } else {
      console.error("Cloudinary upload failed:", response);
      return null;
    }
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error.message);
    fs.unlinkSync(localFilePath); // Remove the locally saved temp file
    return null;
  }
};

export default uploadOnCloudinary;
