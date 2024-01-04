import { v2 as cloudinaryV2 } from "cloudinary";

async function initializeCloudinary() {
  cloudinaryV2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

const uploadOnCloudinary = async (dataUriObject) => {
  try {
    await initializeCloudinary();

    const base64Content = dataUriObject.base64;

    if (!base64Content) {
      console.error("Invalid Data URI format");
      return null;
    }

    const response = await cloudinaryV2.uploader.upload(
      `data:image/png;base64,${base64Content}`,
      {
        resource_type: "raw",
        folder: "FMS",
        use_filename: true,
      }
    );

    //console.log("Cloudinary API Response:", response);

    if (response && response.url) {
      console.log("File uploaded successfully on Cloudinary", response.url);
      return response;
    } else {
      console.error("Cloudinary upload failed:", response);
      return null;
    }
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error.message);
    return null;
  }
};

export default uploadOnCloudinary;
