const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Use memory storage – upload buffer directly to Cloudinary v2 via upload_stream.
// This avoids multer-storage-cloudinary which only supports cloudinary v1 (CVE present).
const storage = multer.memoryStorage();

/**
 * Upload a file buffer to Cloudinary.
 * Returns a Promise resolving to { url, filename } (filename = public_id).
 */
function uploadToCloudinary(buffer, mimetype) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "wanderlust_DEV",
        allowed_formats: ["png", "jpg", "jpeg", "webp"],
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, filename: result.public_id });
      }
    );
    stream.end(buffer);
  });
}

module.exports = { cloudinary, storage, uploadToCloudinary };
