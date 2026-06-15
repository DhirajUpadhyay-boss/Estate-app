const mongoose = require('mongoose');

/**
 * ResearchItem model — stores "Research and Insights" cards shown on Home page.
 * Matches the shape of seed/researchItems.js exactly.
 * image field holds a Cloudinary URL.
 */
const researchItemSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image:       { type: String, required: true }, // Cloudinary URL
    route:       { type: String, required: true, trim: true }, // e.g. '/Price'
    isActive:    { type: Boolean, default: true }, // hide/show card
  },
  { timestamps: true }
);

module.exports = mongoose.model('ResearchItem', researchItemSchema);
