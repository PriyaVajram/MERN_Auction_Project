import { config } from "dotenv";
import app from "./app.js";
import { v2 as cloudinary } from "cloudinary";

// Load environment variables
config({ path: "./config/config.env" });

// ✅ Debug log to verify env variables
console.log("🔑 ENV Loaded:", {
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ? "✅ Loaded" : "❌ MISSING",
  PORT: process.env.PORT,
});

// ✅ Configure Cloudinary correctly (since we imported v2)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Test connection to Cloudinary (optional, but useful for debugging)
try {
  const result = await cloudinary.api.ping();
  console.log("✅ Cloudinary Connected:", result);
} catch (err) {
  console.error("❌ Cloudinary Error:", err.message);
}

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server listening on port ${process.env.PORT}`);
});
