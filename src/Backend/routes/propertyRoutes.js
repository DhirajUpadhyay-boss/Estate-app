const express = require('express');
const propertyController = require('../controller/propertyController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', propertyController.listProperties);
router.post('/', authMiddleware, propertyController.createProperty);

module.exports = router;
