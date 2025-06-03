// server/routes/tools.js
router.get('/tools', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 12;
  const skip = (page - 1) * limit;

  const tools = await Tool.find().skip(skip).limit(limit);
  res.json(tools);
});