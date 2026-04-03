const { newsItems } = require('../seed/newsItems');

/** GET /api/news — return all news articles as JSON */
function getNewsItems(req, res, next) {
  try {
    res.json(newsItems);
  } catch (err) {
    next(err);
  }
}

module.exports = { getNewsItems };
