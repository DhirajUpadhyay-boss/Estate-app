const asyncHandler = require('../utils/asyncHandler');
const { properties } = require('../seed/properties');

const listProperties = asyncHandler(async (req, res) => {
  res.json({ properties });
});

/** Example protected write — persist to MongoDB when Property model exists */
const createProperty = asyncHandler(async (req, res) => {
  res.status(201).json({
    message: 'Authenticated listing draft accepted (wire Property model next)',
    ownerId: req.auth.sub,
    received: req.body,
  });
});

module.exports = { listProperties, createProperty };
