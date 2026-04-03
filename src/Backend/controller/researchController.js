const { researchItems } = require('../seed/researchItems');

/** GET /api/research — return all research cards as JSON */
function getResearchItems(req, res, next) {
  try {
    res.json(researchItems);
  } catch (err) {
    next(err);
  }
}

module.exports = { getResearchItems };
