const express = require('express');
const newsController = require('../controller/newsController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

const router = express.Router();

// Public — React frontend calls this to get news
router.get('/', newsController.getNewsItems);

// Protected — only logged-in admin can pin a news article with image
router.post('/', authMiddleware, upload.single('image'), newsController.createNewsItem);

// Protected — delete a pinned article
router.delete('/:id', authMiddleware, newsController.deleteNewsItem);

module.exports = router;
