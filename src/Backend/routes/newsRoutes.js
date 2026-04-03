const express = require('express');
const newsController = require('../controller/newsController');

const router = express.Router();

router.get('/', newsController.getNewsItems); // matching the news-blogs-route.

module.exports = router;
