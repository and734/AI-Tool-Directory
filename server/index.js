require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const fs = require('fs');
const toolRoutes = require('./routes/toolRoutes');
const searchRoutes = require('./routes/searchRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/tools', require('./routes/toolRoutes'));
app.use('/api/search', require('./routes/searchRoutes'));
app.use('/api/submissions', require('./routes/submissionRoutes'));
app.use('/api/submissions', submissionRoutes);
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✓ Database connected"))
  .catch(err => console.error("✗ DB connection failed:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
});