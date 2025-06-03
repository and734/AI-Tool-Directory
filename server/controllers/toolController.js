const Tool = require('../models/Tool');

// Get all tools
exports.getAllTools = async (req, res) => {
  try {
    const tools = await Tool.find();
    res.json(tools);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tools' });
  }
};

// Submit new tool
exports.submitTool = async (req, res) => {
  try {
    const tool = new Tool(req.body);
    await tool.save();
    res.status(201).json(tool);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit tool' });
  }
};