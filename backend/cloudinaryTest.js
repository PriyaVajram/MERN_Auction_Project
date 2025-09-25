import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config(); // Loads .env variables

// Configure cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Quick test: fetch account details
const testCloudinary = async () => {
  try {
    const result = await cloudinary.api.ping();
    console.log("✅ Cloudinary Connection Successful!");
    console.log(result);
  } catch (error) {
    console.error("❌ Cloudinary Connection Failed:");
    console.error(error.message);
  }
};

testCloudinary();
