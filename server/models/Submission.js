const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  url: {
    type: String,
    required: true,
    unique: true
  },
  category: { type: String, required: true },
  icon: { type: String, required: true },
  image: { type: String },
  submittedBy: { type: String, default: 'anonymous' },
  submittedAt: { type: Date, default: Date.now },
  approved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Submission', SubmissionSchema);const express = require('express');
                                                                const router = express.Router();
                                                                const { aiSearch } = require('../controllers/searchController');

                                                                // AI search endpoint
                                                                router.post('/search', aiSearch);

                                                                module.exports = router;