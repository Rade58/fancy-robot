import cloudinary from "cloudinary";

const cl = cloudinary.v2;

cl.config({
  cloud_name: process.env.CLOUDINARY_USERNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const cloudinaryUpload = async (base64Content: string) =>
  cl.uploader.upload(base64Content);

export default cloudinaryUpload;
