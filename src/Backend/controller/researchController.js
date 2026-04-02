const { researchItems } = require('../seed/researchItems');

/** GET /api/research — return all research cards as JSON */
function getResearchItems(req, res) {
  res.json(researchItems);
}

module.exports = { getResearchItems };
