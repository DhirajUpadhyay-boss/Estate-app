const mongoose = require('mongoose');

/**
 * NewsItem model — stores "News and Articles" cards shown on Home page.
 * Matches the shape of seed/newsItems.js exactly.
 * image field holds a Cloudinary URL.
 */
const newsItemSchema = new mongoose.Schema(
  {
    title:   { type: String, required: true, trim: true },
    excerpt: { type: String, required: true, trim: true }, // short summary shown on card
    image:   { type: String, required: true },             // Cloudinary URL
    href:    { type: String, required: true, trim: true }, // external article link
    author:  { type: String, required: true, trim: true }, // e.g. 'Economic Times'
    date:    { type: String, required: true, trim: true }, // e.g. 'Mar 2025'
    isActive: { type: Boolean, default: true },            // hide/show card
  },
  { timestamps: true }
);

module.exports = mongoose.model('NewsItem', newsItemSchema);
