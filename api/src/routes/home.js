const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// GET /home - Get homepage data
router.get('/', homeController.getHomepage);

// GET /hero - Get hero banner content only
router.get('/hero', homeController.getHero);

// GET /carousels - Get carousels only
router.get('/carousels', homeController.getCarousels);

module.exports = router;
