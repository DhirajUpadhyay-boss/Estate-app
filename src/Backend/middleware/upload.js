const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Step 1: Configure Cloudinary using keys from .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Step 2: Tell multer to store uploaded files directly on Cloudinary
// (not on your local disk)
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'estate-app',              // images go into this folder on Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1200, crop: 'limit' }], // resize large images
  },
});

// Step 3: Export the multer middleware ready to use in routes
const upload = multer({ storage });

module.exports = upload;
