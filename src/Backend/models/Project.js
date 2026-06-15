const mongoose = require('mongoose');

/**
 * Project model — stores real estate project listings.
 * image field holds the Cloudinary URL (not the file itself).
 */
const projectSchema = new mongoose.Schema(
  {
    title:    { type: String, required: true, trim: true },
    price:    { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    image:    { type: String, required: true }, // Cloudinary URL
    description: { type: String, default: '' },
    isActive: { type: Boolean, default: true }, // hide/show listing
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

module.exports = mongoose.model('Project', projectSchema);
