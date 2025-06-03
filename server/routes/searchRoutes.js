const express = require('express');
const router = express.Router();
const { aiSearch } = require('../controllers/searchController');

// AI search endpoint
router.post('/search', aiSearch);

module.exports = router;