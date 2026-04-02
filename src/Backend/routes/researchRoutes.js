const express = require('express');
const researchController = require('../controller/researchController');

const router = express.Router();

router.get('/', researchController.getResearchItems);

module.exports = router;
