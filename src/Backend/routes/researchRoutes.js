const express = require('express');
const researchController = require('../controller/researchController');

const router = express.Router();

router.get('/', researchController.getResearchItems); // For matching with the upcoming route,

module.exports = router;
