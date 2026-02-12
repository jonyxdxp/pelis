const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { analyticsLimiter } = require('../middleware/rateLimiter');

// POST /analytics/view - Track content view
router.post('/view', analyticsLimiter, analyticsController.trackView);

// GET /analytics/content/:id/stats - Get content statistics
router.get('/content/:id/stats', analyticsController.getContentStats);

// GET /analytics/popular - Get popular content
router.get('/popular', analyticsController.getPopularContent);

// GET /analytics/dashboard - Get dashboard stats
router.get('/dashboard', analyticsController.getDashboardStats);

module.exports = router;


