const { newsItems: seedNews } = require('../seed/newsItems');
const NewsItem = require('../models/NewsItem');
const asyncHandler = require('../utils/asyncHandler');

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = `https://newsapi.org/v2/everything?q=real+estate+india&language=en&sortBy=publishedAt&pageSize=10&apiKey=${NEWS_API_KEY}`;

/**
 * GET /api/news
 * 1. Tries to fetch live news from NewsAPI.org
 * 2. Merges with any manually pinned articles from MongoDB
 * 3. Falls back to seed data if NewsAPI fails (e.g. network error)
 */
const getNewsItems = asyncHandler(async (req, res) => {
  // --- Pinned articles from MongoDB (manually added by admin) ---
  const pinned = await NewsItem.find({ isActive: true }).sort({ createdAt: -1 });

  // --- Live news from NewsAPI.org ---
  let liveNews = [];
  try {
    const response = await fetch(NEWS_API_URL);
    const data = await response.json();

    if (data.status === 'ok' && Array.isArray(data.articles)) {
      liveNews = data.articles
        .filter((a) => a.urlToImage) // only articles that have an image
        .map((a, idx) => ({
          id: `live-${idx}`,
          title: a.title,
          excerpt: a.description || '',
          image: a.urlToImage,
          href: a.url,
          author: a.source?.name || 'News',
          date: a.publishedAt
            ? new Date(a.publishedAt).toLocaleDateString('en-IN', {
                month: 'short',
                year: 'numeric',
              })
            : '',
        }));
    }
  } catch (err) {
    // NewsAPI failed — log and fall back gracefully
    console.warn('[newsController] NewsAPI fetch failed:', err.message);
  }

  // --- Fallback to seed if both sources are empty ---
  const fallback = liveNews.length === 0 && pinned.length === 0 ? seedNews : [];

  // --- Merge: pinned first, then live, then fallback ---
  const result = [
    ...pinned.map((p) => ({ ...p.toObject(), id: p._id.toString() })),
    ...liveNews,
    ...fallback,
  ];

  res.json(result);
});

/**
 * POST /api/news  (admin only — protected by authMiddleware)
 * Manually pin a news article with an uploaded image.
 */
const createNewsItem = asyncHandler(async (req, res) => {
  const { title, excerpt, href, author, date } = req.body;

  if (!title || !excerpt || !href || !author || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // req.file.path is the Cloudinary URL set by upload middleware
  if (!req.file) {
    return res.status(400).json({ message: 'Image is required' });
  }

  const item = await NewsItem.create({
    title,
    excerpt,
    image: req.file.path,
    href,
    author,
    date,
  });

  res.status(201).json(item);
});

/**
 * DELETE /api/news/:id  (admin only)
 */
const deleteNewsItem = asyncHandler(async (req, res) => {
  await NewsItem.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = { getNewsItems, createNewsItem, deleteNewsItem };
