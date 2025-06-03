// server/routes/categories.js
const Tool = require('../models/Tool');

router.get('/categories', async (req, res) => {
  const categories = await Tool.distinct('category');
  res.json(['All', ...categories]);
});