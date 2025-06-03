const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');

// Submission routes
router.get('/submissions', submissionController.getAllSubmissions);
router.post('/submissions', submissionController.submitTool);
router.put('/submissions/:id/approve', submissionController.approveSubmission);
router.delete('/submissions/:id', submissionController.rejectSubmission);

module.exports = router;