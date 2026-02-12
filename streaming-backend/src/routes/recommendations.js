const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

// GET /content/:id/recommendations - Get recommendations for content
router.get('/content/:id/recommendations', recommendationController.getRecommendations);

// GET /trending - Get trending content (movies + series)
router.get('/trending', recommendationController.getTrending);

module.exports = router;
