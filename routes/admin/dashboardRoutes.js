const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../../middleware/authMiddleware');
const dashboardController = require('../../controllers/Admin/dashboardController');

// Get dashboard statistics
router.get('/stats', protect, adminOnly, dashboardController.getStats);

module.exports = router;
