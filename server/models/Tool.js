const mongoose = require('mongoose');

const ToolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  icon: { type: String, required: true },
  image: { type: String },
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tool', ToolSchema);